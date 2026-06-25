function unauthorized() {
  return new Response("認証が必要です。", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="LP Wizard", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

function parseBasicAuth(header) {
  if (!header || !header.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separator = decoded.indexOf(":");

    if (separator < 0) {
      return null;
    }

    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

async function safeEqual(leftValue, rightValue) {
  const encoder = new TextEncoder();
  const left = new Uint8Array(
    await crypto.subtle.digest("SHA-256", encoder.encode(String(leftValue || ""))),
  );
  const right = new Uint8Array(
    await crypto.subtle.digest("SHA-256", encoder.encode(String(rightValue || ""))),
  );

  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    diff |= (left[index] || 0) ^ (right[index] || 0);
  }

  return diff === 0;
}

async function isAuthorized(request, env) {
  const credentials = parseBasicAuth(request.headers.get("Authorization"));

  if (!credentials || !env.LP_WIZARD_PASSWORD) {
    return false;
  }

  const expectedUser = env.LP_WIZARD_USER || "kuribou202";
  const userMatches = await safeEqual(credentials.user, expectedUser);
  const passwordMatches = await safeEqual(credentials.password, env.LP_WIZARD_PASSWORD);

  return userMatches && passwordMatches;
}

export default {
  async fetch(request, env) {
    if (!(await isAuthorized(request, env))) {
      return unauthorized();
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "private, no-store");
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
