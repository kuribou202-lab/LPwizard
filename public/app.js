const fields = [
  "serviceName",
  "productDescription",
  "targetAudience",
  "valueProposition",
  "lpGoal",
  "kpi",
  "trafficSource",
  "conversionPoint",
  "designDirection",
  "visualWorld",
  "colorMood",
  "photoStyle",
  "fvDirection",
  "layoutNotes",
  "notes",
  "customerPain",
  "desiredFuture",
  "painCause",
  "solution",
  "benefits",
  "differentiators",
  "trustProof",
  "offer",
  "objections",
  "cta",
  "generatedCopy",
  "designAssets",
  "designGuide",
  "aiConsultAnswer"
];


const requiredFields = {
  serviceName: "サービス名",
  productDescription: "商材 / LP内容",
  targetAudience: "ターゲット",
  lpGoal: "LPの目的",
  conversionPoint: "ゴール地点",
  customerPain: "ターゲットの悩み",
  desiredFuture: "理想の未来",
  solution: "解決策",
  cta: "行動ボタン（CTA）",
  generatedCopy: "AI生成後のLP構成・原稿",
  designDirection: "デザイン方針",
  visualWorld: "世界観",
  colorMood: "色・雰囲気",
  fvDirection: "ファーストビュー方針",
  designAssets: "生成画像の保存場所・メモ",
  designGuide: "デザインガイド本文"
};

const workflowSteps = [
  "projects",
  "brief",
  "library",
  "favorites",
  "writing",
  "references",
  "copy",
  "design",
  "canva",
  "guide",
  "settings"
];

const stepTitles = {
  projects: "案件一覧",
  brief: "案件ブリーフ",
  library: "お気に入りLP管理",
  favorites: "お気に入りLP一覧",
  references: "完成イメージ選択",
  writing: "ライティング設計",
  copy: "構成・原稿生成",
  design: "デザイン設計",
  canva: "Canva編集チェック",
  guide: "デザインガイド",
  settings: "設定"
};

const requiredForCopy = [
  ["serviceName", "サービス名"],
  ["productDescription", "商材 / LP内容"],
  ["targetAudience", "ターゲット"],
  ["lpGoal", "LPの目的"],
  ["conversionPoint", "ゴール地点"],
  ["customerPain", "ターゲットの悩み"],
  ["desiredFuture", "理想の未来"],
  ["solution", "解決策"],
  ["cta", "CTA"]
];

const requiredForDesign = [
  ["generatedCopy", "AI生成後のLP構成・原稿"],
  ["designDirection", "デザイン方針"],
  ["visualWorld", "世界観"],
  ["colorMood", "色・雰囲気"],
  ["fvDirection", "ファーストビュー方針"]
];

const checklistItems = [
  ["画像をCanvaにアップロード", "生成された全セクション画像を順番通りに配置する。"],
  ["元画像を複製して残す", "Magic Layerで崩れた時に戻せるよう、隣に元画像を置いておく。"],
  ["Magic Layerで分解", "テキスト、装飾、写真、背景を編集可能なレイヤーに分ける。"],
  ["CTAをクリック可能にする", "来店予約、モバイルオーダー、応募ボタンを画像のままにしない。"],
  ["文字サイズを確認", "スマホで読めない小さい文字や潰れた文字を修正する。"],
  ["商品画像の重複を確認", "同じ構図のパフェや商品画像が多すぎないか確認する。"],
  ["事実関係を確認", "実商品、価格、店舗、キャンペーン内容とAI生成画像が矛盾していないか見る。"],
  ["パクリ感を確認", "参考LPに寄りすぎた構図、装飾、レイアウトになっていないか確認する。"],
  ["次回添削メモを残す", "プロ目線で直したい箇所をセクション別にメモする。"]
];

const progressSections = [
  {
    id: "brief",
    label: "案件概要",
    items: [
      { id: "serviceName", label: "サービス名", field: "serviceName", required: true },
      { id: "productDescription", label: "商材 / LP内容", field: "productDescription", required: true },
      { id: "targetAudience", label: "ターゲット", field: "targetAudience", required: true },
      { id: "valueProposition", label: "提供価値", field: "valueProposition" },
      { id: "lpGoal", label: "LPの目的", field: "lpGoal", required: true },
      { id: "kpi", label: "成果の目安", field: "kpi" },
      { id: "trafficSource", label: "流入経路", field: "trafficSource" },
      { id: "conversionPoint", label: "ゴール地点", field: "conversionPoint", required: true }
    ]
  },
  {
    id: "writing",
    label: "ライティング設計",
    items: [
      { id: "customerPain", label: "ターゲットの悩み", field: "customerPain", required: true },
      { id: "desiredFuture", label: "理想の未来", field: "desiredFuture", required: true },
      { id: "painCause", label: "悩みの原因", field: "painCause" },
      { id: "solution", label: "解決策", field: "solution", required: true },
      { id: "benefits", label: "ベネフィット", field: "benefits" },
      { id: "differentiators", label: "差別化ポイント", field: "differentiators" },
      { id: "trustProof", label: "信頼材料", field: "trustProof" },
      { id: "offer", label: "オファー", field: "offer" },
      { id: "objections", label: "不安・反論", field: "objections" },
      { id: "cta", label: "CTA", field: "cta", required: true }
    ]
  },
  {
    id: "references",
    label: "参考LP",
    items: [
      { id: "mainReference", label: "メイン参考LPを1件選択", test: (project) => Boolean(project?.mainReference), focus: "referenceSearch", required: true },
      { id: "supportReference", label: "補助参考LPを1件以上選択", test: (project) => Boolean(project?.references?.length), focus: "referenceSearch", required: true }
    ]
  },
  {
    id: "copy",
    label: "構成・原稿",
    items: [
      { id: "copyPromptGenerated", label: "構成・原稿プロンプトを生成済み", flag: "copyPromptGenerated", focus: "generateCopyPrompt" },
      { id: "generatedCopy", label: "AI生成後のLP構成・原稿を保存済み", field: "generatedCopy", required: true }
    ]
  },
  {
    id: "design",
    label: "デザイン設計",
    items: [
      { id: "designDirection", label: "デザイン方針", field: "designDirection", required: true },
      { id: "visualWorld", label: "世界観", field: "visualWorld", required: true },
      { id: "colorMood", label: "色・雰囲気", field: "colorMood", required: true },
      { id: "photoStyle", label: "写真・画像の見せ方", field: "photoStyle" },
      { id: "fvDirection", label: "ファーストビュー方針", field: "fvDirection", required: true },
      { id: "layoutNotes", label: "レイアウト・余白", field: "layoutNotes" }
    ]
  },
  {
    id: "image",
    label: "画像生成準備",
    stepId: "design",
    items: [
      { id: "designPromptGenerated", label: "画像生成プロンプトを生成済み", flag: "designPromptGenerated", focus: "generateDesignPrompt" },
      { id: "designAssets", label: "生成画像の保存場所・メモを入力済み", field: "designAssets", required: true }
    ]
  },
  {
    id: "canva",
    label: "Canva確認",
    items: checklistItems.map((item, index) => ({
      id: `canva-${index}`,
      label: item[0],
      test: (project) => Boolean(project?.checks?.[index]),
      focus: "canvaChecklist"
    }))
  },
  {
    id: "guide",
    label: "デザインガイド",
    items: [
      { id: "guidePromptGenerated", label: "デザインガイドプロンプトを生成済み", flag: "guidePromptGenerated", focus: "generateGuidePrompt" },
      { id: "designGuide", label: "デザインガイド本文を保存済み", field: "designGuide", required: true }
    ]
  }
];

const optionGroups = [
  {
    key: "businessType",
    title: "商材タイプ",
    target: "productDescription",
    options: ["店舗集客", "EC販売", "予約獲得", "問い合わせ獲得", "資料請求", "無料体験", "イベント告知", "キャンペーン"]
  },
  {
    key: "targetTraits",
    title: "ターゲットの特徴",
    target: "targetAudience",
    options: ["20代女性", "30代女性", "子育て世代", "会社員", "経営者", "美容感度が高い", "SNSで情報収集", "価格より品質重視", "初心者", "リピーター候補"]
  },
  {
    key: "valueAngles",
    title: "訴求したい価値",
    target: "valueProposition",
    options: ["限定感", "手軽さ", "高品質", "専門性", "安心感", "お得感", "時短", "実績", "かわいさ", "高級感", "体験価値", "ギフト向き"]
  },
  {
    key: "goals",
    title: "LPの目的",
    target: "lpGoal",
    options: ["購入を増やす", "予約を増やす", "問い合わせを増やす", "資料請求を増やす", "無料相談へ誘導", "LINE登録を増やす", "Instagram応募を増やす", "来店を増やす"]
  },
  {
    key: "traffic",
    title: "流入経路",
    target: "trafficSource",
    options: ["Instagram広告", "Instagramリール", "Google広告", "検索流入", "LINE配信", "メルマガ", "店舗QR", "チラシQR", "YouTube", "紹介"]
  },
  {
    key: "conversions",
    title: "ゴール地点",
    target: "conversionPoint",
    options: ["購入ボタン", "予約フォーム", "問い合わせフォーム", "LINE追加", "資料DL", "無料相談予約", "モバイルオーダー", "キャンペーン応募"]
  },
  {
    key: "designTaste",
    title: "デザインの方向性",
    target: "designDirection",
    options: ["モバイルファースト", "シンプル", "高級感", "親しみやすい", "かわいい", "信頼感", "和風", "ナチュラル", "ポップ", "ミニマル", "手書き装飾", "写真を大きく見せる"]
  }
];

const consultThemes = [
  {
    key: "target",
    label: "ターゲットを具体化したい",
    target: "targetAudience",
    instruction: "LP制作に使えるターゲット像を具体化してください。年齢・悩み・欲求・購入前の不安・行動パターン・刺さる言葉を整理してください。"
  },
  {
    key: "value",
    label: "提供価値を整理したい",
    target: "valueProposition",
    instruction: "商品やサービスの提供価値を整理してください。機能的価値、感情的価値、他社との違い、LPで強調すべきベネフィットに分けてください。"
  },
  {
    key: "goal",
    label: "LPの目的・成果の目安を提案してほしい",
    target: "lpGoal",
    instruction: "このLPで目指すべき目的と成果の目安を提案してください。主目的、副目的、測るべき数字、優先順位、注意点を整理してください。"
  },
  {
    key: "flow",
    label: "導線を整理したい",
    target: "conversionPoint",
    instruction: "流入からゴール地点までの導線を整理してください。ユーザー行動、必要なボタンや案内、途中離脱を防ぐ工夫、ゴール地点の優先順位を提案してください。"
  },
  {
    key: "design",
    label: "デザイン方針を提案してほしい",
    target: "designDirection",
    instruction: "LPのデザイン方針を提案してください。世界観、色、写真・画像、余白、装飾、スマホでの見せ方、参考にすべき方向性を整理してください。"
  },
  {
    key: "missing",
    label: "不足情報をチェックしてほしい",
    target: "notes",
    instruction: "LP制作前に不足している情報、矛盾している情報、クライアントへ確認すべき質問を洗い出してください。重要度順に整理してください。"
  },
  {
    key: "copy",
    label: "構成・原稿を改善したい",
    target: "generatedCopy",
    instruction: "現在の案件情報をもとに、LP構成と原稿を改善してください。訴求の弱い箇所、追加すべきセクション、CTA改善案も含めてください。"
  }
];

let state = {
  projects: [],
  currentProjectId: null,
  mainReference: null,
  references: [],
  favorites: [],
  checks: {},
  selections: {},
  selectionNotes: {}
};

const $ = (id) => document.getElementById(id);

function getFieldValue(id) {
  return ($(id)?.value || "").trim();
}

function setStatus(text) {
  $("saveStatus").textContent = text;
}

function createId(prefix = "project") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function currentProject() {
  return state.projects.find((project) => project.id === state.currentProjectId) || null;
}

function buildProjectData() {
  const existing = currentProject();
  const data = {
    id: existing?.id || createId(),
    name: getFieldValue("serviceName") || existing?.name || "名称未設定の案件",
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    mainReference: state.mainReference,
    references: state.references,
    checks: state.checks,
    selections: state.selections,
    selectionNotes: state.selectionNotes,
    progressFlags: {
      ...(existing?.progressFlags || {})
    }
  };
  fields.forEach((id) => {
    data[id] = getFieldValue(id);
  });
  return data;
}

function buildAllData() {
  return {
    exportedAt: new Date().toISOString(),
    version: 2,
    currentProjectId: state.currentProjectId,
    favorites: state.favorites,
    projects: state.projects
  };
}

function saveCurrentProjectFromForm() {
  if (!state.currentProjectId) return;
  const data = buildProjectData();
  const index = state.projects.findIndex((project) => project.id === state.currentProjectId);
  if (index >= 0) {
    state.projects[index] = data;
  } else {
    state.projects.push(data);
    state.currentProjectId = data.id;
  }
}

function persistProject(statusText = "自動保存済み") {
  saveCurrentProjectFromForm();
  localStorage.setItem("lpWizardData", JSON.stringify(buildAllData()));
  renderProjects();
  renderCurrentProjectLabel();
  renderProgress();
  renderSectionProgressSummaries();
  renderStepStates();
  setStatus(statusText);
}

let autoSaveTimer;

function scheduleAutoSave() {
  setStatus("編集中");
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => persistProject(), 500);
}

function missingFields(requirements) {
  return requirements.filter(([id]) => !getFieldValue(id)).map(([, label]) => label);
}

function showValidation(id, missing, successText) {
  const box = $(id);
  if (!box) return;
  box.hidden = false;
  box.classList.toggle("is-ok", missing.length === 0);
  box.textContent = missing.length
    ? `先に入力すると精度が上がる項目: ${missing.join("、")}`
    : successText;
}

function renderSectionProgressSummaries() {
  const project = currentFormProject();
  const sections = projectProgress(project).sections;
  document.querySelectorAll("[data-section-progress]").forEach((element) => {
    const stepId = element.dataset.sectionProgress;
    const relatedSections = sectionForStep(stepId, sections);
    if (!relatedSections.length) {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    const allItems = relatedSections.flatMap((section) => section.items);
    const requiredItems = allItems.filter((item) => item.required);
    const completedAll = allItems.filter((item) => isProgressItemComplete(project, item)).length;
    const completedRequired = requiredItems.filter((item) => isProgressItemComplete(project, item)).length;
    const requiredText = requiredItems.length
      ? completedRequired === requiredItems.length
        ? "必須項目の入力が完了しました"
        : `必須項目 ${completedRequired} / ${requiredItems.length}入力済み`
      : "必須項目はありません";
    element.innerHTML = `
      <strong>${requiredText}</strong>
      <span>全項目 ${completedAll} / ${allItems.length}入力済み</span>
    `;
  });
}

function setupSectionProgressSummaries() {
  document.querySelectorAll(".panel").forEach((panel) => {
    if (panel.querySelector("[data-section-progress]")) return;
    if (!sectionForStep(panel.id, projectProgress(currentFormProject()).sections).length) return;
    const summary = document.createElement("div");
    summary.className = "section-progress-summary";
    summary.dataset.sectionProgress = panel.id;
    const header = panel.querySelector(".section-head, .section-subhead");
    if (header) header.insertAdjacentElement("afterend", summary);
  });
  renderSectionProgressSummaries();
}

function setupStepNavigation() {
  document.querySelectorAll(".panel").forEach((panel) => {
    if (panel.querySelector(".step-navigation")) return;
    const nav = document.createElement("div");
    nav.className = "step-navigation";
    nav.innerHTML = `
      <button class="secondary" type="button" data-step-move="-1">前のステップへ</button>
      <button type="button" data-step-move="1">次のステップへ</button>
    `;
    panel.appendChild(nav);
  });
  document.querySelectorAll("[data-step-move]").forEach((button) => {
    button.addEventListener("click", () => moveStep(Number(button.dataset.stepMove)));
  });
}

function isProgressItemComplete(project, item) {
  if (!project) return false;
  if (item.field) return Boolean(projectFieldTextWithAssist(project, item.field).trim());
  if (item.flag) return Boolean(project.progressFlags?.[item.flag]);
  if (item.test) return Boolean(item.test(project));
  return false;
}

function progressSectionResult(project, section) {
  const complete = section.items.filter((item) => isProgressItemComplete(project, item)).length;
  return {
    ...section,
    complete,
    total: section.items.length,
    missingItems: section.items.filter((item) => !isProgressItemComplete(project, item))
  };
}

function projectProgress(project = currentProject()) {
  if (!project) return { percent: 0, next: "新規案件を作成してください", complete: 0, total: 0, sections: [] };
  const sections = progressSections.map((section) => progressSectionResult(project, section));
  const complete = sections.reduce((sum, section) => sum + section.complete, 0);
  const total = sections.reduce((sum, section) => sum + section.total, 0);
  const nextSection = sections.find((section) => section.complete < section.total);
  const nextItem = nextSection?.missingItems[0];
  return {
    percent: total ? Math.round((complete / total) * 100) : 0,
    next: nextItem ? `次: ${nextSection.label}の「${nextItem.label}」` : "第1・2話の工程は完了です",
    complete,
    total,
    sections
  };
}

function progressStatusText(section) {
  if (!section.total || section.complete === 0) return "未着手";
  if (section.complete >= section.total) return "完了";
  return "入力中";
}

function progressStatusClass(section) {
  if (!section.total || section.complete === 0) return "not-started";
  if (section.complete >= section.total) return "done";
  return "in-progress";
}

function currentFormProject() {
  return currentProject() ? buildProjectData() : null;
}

function renderProgress() {
  const progress = projectProgress(currentFormProject());
  if ($("progressLabel")) $("progressLabel").textContent = `全体進捗 ${progress.percent}%`;
  if ($("nextActionLabel")) $("nextActionLabel").textContent = progress.next;
  if ($("progressBar")) $("progressBar").style.width = `${progress.percent}%`;
  const track = document.querySelector(".progress-track");
  if (track) track.setAttribute("aria-valuenow", String(progress.percent));
  if ($("progressDetails")) {
    $("progressDetails").innerHTML = progress.sections
      .map((section) => `
        <div class="progress-detail">
          <span>${escapeHtml(section.label)}</span>
          <strong>${section.complete} / ${section.total}項目</strong>
        </div>
      `)
      .join("");
  }
  renderStepStates(progress.sections);
}

function sectionForStep(stepId, sections = projectProgress(currentFormProject()).sections) {
  return sections.filter((section) => (section.stepId || section.id) === stepId);
}

function renderStepStates(sections = projectProgress(currentFormProject()).sections) {
  document.querySelectorAll(".step").forEach((button) => {
    const stepSections = sectionForStep(button.dataset.step, sections);
    let status = "";
    let statusClass = "not-started";
    if (stepSections.length) {
      const complete = stepSections.reduce((sum, section) => sum + section.complete, 0);
      const total = stepSections.reduce((sum, section) => sum + section.total, 0);
      const summary = { complete, total };
      status = progressStatusText(summary);
      statusClass = progressStatusClass(summary);
    }
    const baseLabel = button.dataset.label || button.textContent.trim();
    button.dataset.label = baseLabel;
    button.innerHTML = `<span>${escapeHtml(baseLabel)}</span>${status ? `<span class="step-state ${statusClass}">${status}</span>` : ""}`;
  });
}

function requiredItemsForStep(stepId) {
  return progressSections
    .filter((section) => (section.stepId || section.id) === stepId)
    .flatMap((section) => section.items.filter((item) => item.required).map((item) => ({ ...item, sectionLabel: section.label })));
}

function missingRequiredItemsForStep(stepId, project = currentFormProject()) {
  return requiredItemsForStep(stepId).filter((item) => !isProgressItemComplete(project, item));
}

function fieldElementForProgressItem(item) {
  return $(item.field || item.focus || item.id);
}

function focusProgressItem(item) {
  const field = fieldElementForProgressItem(item);
  if (!field) return;
  field.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => field.focus({ preventScroll: true }), 250);
}

function showMissingRequiredDialog(count) {
  return new Promise((resolve) => {
    const backdrop = document.createElement("div");
    backdrop.className = "confirm-backdrop";
    backdrop.innerHTML = `
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="missingRequiredTitle">
        <h3 id="missingRequiredTitle">必須項目が${count}件未入力です。このまま次へ進みますか？</h3>
        <div class="confirm-actions">
          <button class="secondary" type="button" data-confirm-action="review">未入力項目を確認する</button>
          <button type="button" data-confirm-action="proceed">このまま次へ進む</button>
        </div>
      </section>
    `;
    document.body.appendChild(backdrop);
    const close = (result) => {
      backdrop.remove();
      resolve(result);
    };
    backdrop.addEventListener("click", (event) => {
      const action = event.target.dataset.confirmAction;
      if (action === "review") close(false);
      if (action === "proceed") close(true);
    });
    backdrop.querySelector("[data-confirm-action='review']").focus();
  });
}

async function confirmStepMove(stepId) {
  const missing = missingRequiredItemsForStep(stepId);
  if (!missing.length) return true;
  const proceed = await showMissingRequiredDialog(missing.length);
  if (proceed) return true;
  focusProgressItem(missing[0]);
  return false;
}

async function switchStep(stepId, options = {}) {
  const activeStep = document.querySelector(".panel.is-visible")?.id;
  if (options.confirmLeave && activeStep && activeStep !== stepId && !(await confirmStepMove(activeStep))) return;
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("is-visible", panel.id === stepId);
  });
  document.querySelectorAll(".step").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.step === stepId);
  });
  $("sectionTitle").textContent = stepTitles[stepId] || "LP制作ウィザード";
  renderProgress();
  renderSectionProgressSummaries();
}

async function moveStep(direction) {
  const activeStep = document.querySelector(".panel.is-visible")?.id || "projects";
  const currentIndex = workflowSteps.indexOf(activeStep);
  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= workflowSteps.length) return;
  await switchStep(workflowSteps[nextIndex], { confirmLeave: direction > 0 });
}

function renderReferences() {
  const list = $("selectedReferenceList");
  if (!state.mainReference && !state.references.length) {
    list.innerHTML = '<p class="reference-url">まだ完成イメージの参考LPが選択されていません。</p>';
    return;
  }

  const main = state.mainReference ? `
    <article class="reference-card selected-main">
      <div class="badge">メイン参考</div>
      <div>
        <div class="reference-title">${escapeHtml(state.mainReference.title)}</div>
        <div class="reference-url">${escapeHtml(state.mainReference.url)}</div>
      </div>
      <button class="danger" type="button" data-clear-main-reference="true">解除</button>
    </article>
  ` : "";

  const supports = state.references
    .map((reference, index) => `
      <article class="reference-card">
        <div class="badge">${reference.type}</div>
        <div>
          <div class="reference-title">${escapeHtml(reference.title)}</div>
          <div class="reference-url">${escapeHtml(reference.url)}</div>
        </div>
        <button class="danger" type="button" data-remove-reference="${index}">削除</button>
      </article>
    `)
    .join("");

  list.innerHTML = main + supports;
}

function favoriteMatches(favorite, scope) {
  const search = getFieldValue(scope === "picker" ? "referenceSearch" : "favoriteSearch").toLowerCase();
  const category = getFieldValue(scope === "picker" ? "referenceCategoryFilter" : "favoriteCategoryFilter");
  const use = getFieldValue(scope === "picker" ? "referenceUseFilter" : "favoriteUseFilter");
  const haystack = [
    favorite.title,
    favorite.url,
    favorite.category,
    favorite.product,
    favorite.defaultUse,
    ...(favorite.tags || [])
  ].join(" ").toLowerCase();

  return (!search || haystack.includes(search))
    && (!category || favorite.category === category)
    && (!use || favorite.defaultUse === use);
}

function filteredFavorites(scope = "library") {
  return state.favorites
    .map((favorite, originalIndex) => ({ ...favorite, originalIndex }))
    .filter((favorite) => favoriteMatches(favorite, scope));
}

function renderFavorites(items = filteredFavorites("library")) {
  const list = $("favoriteList");
  if (!items.length) {
    list.innerHTML = '<p class="favorite-url">まだお気に入り参考サイトがありません。</p>';
    return;
  }

  list.innerHTML = items
    .map((favorite) => {
      const index = favorite.originalIndex ?? state.favorites.indexOf(favorite);
      const score = favorite.score ? `一致 ${favorite.score}` : favorite.defaultUse;
      return `
        <article class="favorite-card compact-favorite-card">
          <div class="favorite-title">${escapeHtml(favorite.title)}</div>
          <div class="badge compact-badge">${score}</div>
          <div class="favorite-category">${escapeHtml(favorite.category || "未分類")}</div>
          <div class="favorite-tags">${escapeHtml([favorite.product, ...(favorite.tags || [])].filter(Boolean).join("、"))}</div>
          <button class="danger" type="button" data-remove-favorite="${index}">削除</button>
        </article>
      `;
    })
    .join("");
}

function renderReferencePicker(items = filteredFavorites("picker")) {
  const list = $("referencePickerList");
  if (!items.length) {
    list.innerHTML = '<p class="favorite-url">条件に合う参考LPがありません。先にお気に入りLP管理で登録してください。</p>';
    return;
  }

  list.innerHTML = items
    .map((favorite) => {
      const index = favorite.originalIndex ?? state.favorites.indexOf(favorite);
      return `
        <article class="favorite-card picker-card">
          <div class="badge">${favorite.defaultUse}</div>
          <div>
            <div class="favorite-title">${escapeHtml(favorite.title)}</div>
            <div class="favorite-url">${escapeHtml(favorite.url)}</div>
            <div class="favorite-tags">${escapeHtml([favorite.category, favorite.product, ...(favorite.tags || [])].filter(Boolean).join("、"))}</div>
          </div>
          <button type="button" data-set-main-favorite="${index}">メインにする</button>
          <button class="secondary" type="button" data-add-support-favorite="${index}">補助に追加</button>
        </article>
      `;
    })
    .join("");
}

function renderChecklist() {
  $("canvaChecklist").innerHTML = checklistItems
    .map(([title, description], index) => `
      <label class="check-item">
        <input type="checkbox" data-check="${index}" ${state.checks[index] ? "checked" : ""} />
        <span>
          <strong>${title}</strong>
          <span>${description}</span>
        </span>
      </label>
    `)
    .join("");
}

function renderOptionGroups() {
  document.querySelectorAll(".field-option-assist").forEach((element) => element.remove());
  optionGroups.forEach((group) => {
    const field = $(group.target);
    const label = field?.closest("label");
    if (!field || !label) return;

    const assist = document.createElement("div");
    assist.className = "field-option-assist";
    assist.innerHTML = `
      <div class="option-group-title">${escapeHtml(group.title)}の入力補助</div>
      <div class="option-grid">
        ${group.options.map((option) => `
          <span class="option-chip">
            <input type="checkbox" data-option-group="${group.key}" value="${escapeHtml(option)}" aria-label="${escapeHtml(option)}" ${isSelected(group.key, option) ? "checked" : ""} />
            <span>${escapeHtml(option)}</span>
          </span>
        `).join("")}
      </div>
      <textarea class="option-note" data-option-note="${group.key}" placeholder="自由追記: 選択肢にない条件や具体情報があれば入力">${escapeHtml(state.selectionNotes[group.key] || "")}</textarea>
    `;
    field.insertAdjacentElement("afterend", assist);
  });
}

function renderConsultThemes() {
  $("aiConsultTheme").innerHTML = consultThemes
    .map((theme) => `<option value="${theme.key}">${theme.label}</option>`)
    .join("");
  syncConsultTarget();
}

function isSelected(groupKey, option) {
  return (state.selections[groupKey] || []).includes(option);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function referencesText() {
  const lines = [];
  if (state.mainReference) {
    lines.push(`- メイン参考LP: ${state.mainReference.title} / ${state.mainReference.url}`);
  }
  state.references.forEach((reference) => {
    lines.push(`- 補助参考LP（${reference.type}）: ${reference.title} / ${reference.url}`);
  });
  return lines.length ? lines.join("\n") : "未登録";
}

function referenceDesignText() {
  if (!state.mainReference && !state.references.length) return "未登録";
  return [
    state.mainReference ? `メイン参考LP: ${state.mainReference.title} / ${state.mainReference.url}` : "",
    ...state.references.map((reference) => `補助参考LP（${reference.type}）: ${reference.title} / ${reference.url}`)
  ]
    .filter(Boolean)
    .join("\n");
}

function favoriteText() {
  if (!state.favorites.length) return "未登録";
  return state.favorites
    .map((favorite) => `- ${favorite.title}: ${favorite.url} / カテゴリー: ${favorite.category || "未設定"} / 商材: ${favorite.product || "未設定"} / 用途: ${favorite.defaultUse} / タグ: ${(favorite.tags || []).join("、")}`)
    .join("\n");
}

function selectionsText() {
  return optionGroups
    .map((group) => {
      const selected = state.selections[group.key] || [];
      const note = state.selectionNotes[group.key] || "";
      const values = selected.length ? selected.join("、") : "未選択";
      return `${group.title}: ${values}${note ? ` / 自由追記: ${note}` : ""}`;
    })
    .join("\n");
}

function optionGroupText(group, source = state) {
  const selected = source.selections?.[group.key] || [];
  const note = source.selectionNotes?.[group.key] || "";
  return [selected.join("、"), note].filter(Boolean).join(" / ");
}

function projectFieldTextWithAssist(project, fieldId) {
  const base = String(project?.[fieldId] || "").trim();
  const additions = optionGroups
    .filter((group) => group.target === fieldId)
    .map((group) => optionGroupText(group, project))
    .filter(Boolean)
    .filter((text) => !base.includes(text));
  return mergeText(base, additions);
}

function fieldTextWithAssist(fieldId) {
  const base = getFieldValue(fieldId);
  const additions = optionGroups
    .filter((group) => group.target === fieldId)
    .map((group) => optionGroupText(group))
    .filter(Boolean)
    .filter((text) => !base.includes(text));
  return mergeText(base, additions) || "未入力";
}

function currentConsultTheme() {
  return consultThemes.find((theme) => theme.key === $("aiConsultTheme").value) || consultThemes[0];
}

function syncConsultTarget() {
  const theme = currentConsultTheme();
  if (theme?.target) $("aiApplyTarget").value = theme.target;
}

function briefText() {
  return `サービス名: ${getFieldValue("serviceName") || "未入力"}
商材 / LP内容: ${fieldTextWithAssist("productDescription")}
ターゲット: ${fieldTextWithAssist("targetAudience")}
提供価値: ${fieldTextWithAssist("valueProposition")}
LPの目的: ${fieldTextWithAssist("lpGoal")}
成果の目安: ${getFieldValue("kpi") || "未入力"}
流入経路: ${fieldTextWithAssist("trafficSource")}
ゴール地点: ${fieldTextWithAssist("conversionPoint")}
デザイン方針: ${fieldTextWithAssist("designDirection")}
補足事項: ${getFieldValue("notes") || "未入力"}

デザイン設計:
世界観: ${getFieldValue("visualWorld") || "未入力"}
色・雰囲気: ${getFieldValue("colorMood") || "未入力"}
写真・画像の見せ方: ${getFieldValue("photoStyle") || "未入力"}
ファーストビュー方針: ${getFieldValue("fvDirection") || "未入力"}
レイアウト・余白: ${getFieldValue("layoutNotes") || "未入力"}

コピーライティング設計:
ターゲットの悩み: ${getFieldValue("customerPain") || "未入力"}
理想の未来: ${getFieldValue("desiredFuture") || "未入力"}
悩みの原因: ${getFieldValue("painCause") || "未入力"}
解決策: ${getFieldValue("solution") || "未入力"}
ベネフィット: ${getFieldValue("benefits") || "未入力"}
差別化ポイント: ${getFieldValue("differentiators") || "未入力"}
信頼材料: ${getFieldValue("trustProof") || "未入力"}
オファー: ${getFieldValue("offer") || "未入力"}
不安・反論: ${getFieldValue("objections") || "未入力"}
行動ボタン（CTA）: ${getFieldValue("cta") || "未入力"}`;
}

function setProgressFlag(flag, value = true, statusText = "自動保存済み") {
  saveCurrentProjectFromForm();
  const project = currentProject();
  if (!project) return;
  project.progressFlags = {
    ...(project.progressFlags || {}),
    [flag]: value
  };
  localStorage.setItem("lpWizardData", JSON.stringify(buildAllData()));
  renderProjects();
  renderProgress();
  renderSectionProgressSummaries();
  setStatus(statusText);
}

function generateCopyPrompt() {
  const missing = missingFields(requiredForCopy);
  showValidation("copyValidation", missing, "主要項目は入力済みです。生成後も事実関係を確認してください。");
  $("copyPrompt").value = `あなたはLP制作ディレクター兼コピーライターです。
以下の案件概要と参考情報をもとに、売れるLPの構成案と原稿を作成してください。

重要条件:
- いきなり見た目を作らず、まず構成と文章を整理する
- LPの目的、成果の目安、導線に沿ってセクション順を決める
- 参考情報は丸写しせず、構成・色味・導線・装飾のヒントとして分解して使う
- ターゲットの悩み、理想の未来、ベネフィット、信頼材料、オファー、行動ボタンをコピーに反映する
- 「こんなお悩みありませんか」から解決策、信頼、行動まで自然につながる流れにする
- 訴求が弱い箇所、不足情報、確認すべき事項も最後に出す
- 店舗名、価格、キャンペーン詳細など未確定情報はダミーとして明示する

案件概要:
${briefText()}

参考LP・参考画像:
${referencesText()}

お気に入り参考サイト:
${favoriteText()}

出力形式:
1. LP全体方針
2. セクション構成
3. 各セクションの目的
4. 見出し
5. 本文
6. CTA文言
7. 不足情報・確認事項
8. 改善提案`;
  setProgressFlag("copyPromptGenerated", true, "構成・原稿プロンプト生成済み");
}

function generateDesignPrompt() {
  const missing = missingFields(requiredForDesign);
  if (!state.mainReference) missing.push("メイン参考LP");
  showValidation("designValidation", missing, "FV生成へ進める状態です。最初にFVだけ確認してください。");
  const copy = getFieldValue("generatedCopy") || "ここに第1工程で作成したLP構成・原稿を貼り付ける";
  $("designPrompt").value = `あなたはLPデザイナーです。
添付する参考画像のテイストに統一して、LPのデザイン画像を生成してください。

進め方:
1. 最初はファーストビューのみ生成してください
2. ファーストビューの方向性がOKになったら、全セクションを1セクションずつ順番に生成してください
3. 途中確認なしで進める許可がある場合のみ、2セクション目以降を連続生成してください
4. 文字は後でCanvaで編集する前提なので、重要テキストが潰れないようにしてください
5. 参考画像に寄せすぎず、パクリに見えない別案として作ってください
6. 商品・店舗・キャンペーン内容が事実と違わないよう、不明点は仮置きと明示してください

案件概要:
${briefText()}

LP構成・原稿:
${copy}

参考LP・参考画像:
${referenceDesignText()}

デザイン条件:
- モバイルファースト
- CTAが後からクリック可能に加工しやすい
- セクションごとの役割が視覚的に分かる
- 同じ商品構図を繰り返しすぎない
- 世界観、色、余白、装飾を統一する
- デザイン設計の世界観、色、写真、FV方針、余白の指定を優先する

まず生成するもの:
- ファーストビュー画像
- 生成意図の短い説明
- 次に進める場合の全セクション生成方針`;
  setProgressFlag("designPromptGenerated", true, "画像生成プロンプト生成済み");
}

function generateGuidePrompt() {
  $("guidePrompt").value = `あなたはブランドデザイナーです。
このLPの生成画像、案件概要、原稿をもとに、今後同じテイストでバナー・広告・別LPを作れるデザインガイドを作成してください。

案件概要:
${briefText()}

LP構成・原稿:
${getFieldValue("generatedCopy") || "未登録"}

生成画像メモ:
${getFieldValue("designAssets") || "未登録"}

参考LP・参考画像:
${referencesText()}

出力形式:
1. ブランド概要
2. 世界観
3. カラーパレット
4. フォント方針
5. 写真・画像テイスト
6. 装飾ルール
7. 余白・レイアウト方針
8. CTAデザインルール
9. NG例
10. 他のAIに渡す再現用プロンプト
11. 人間が一目で理解できる画像ガイドを作るための指示`;
  setProgressFlag("guidePromptGenerated", true, "デザインガイドプロンプト生成済み");
}

function generateAiConsultPrompt() {
  const theme = currentConsultTheme();
  $("aiConsultPrompt").value = `あなたはLP制作に強いWebディレクターです。
以下の案件情報をもとに、初心者にも分かる形でアドバイスしてください。

相談テーマ:
${theme.label}

依頼内容:
${theme.instruction}

案件概要:
${briefText()}

参考LP・参考画像:
${referencesText()}

現在のLP構成・原稿:
${getFieldValue("generatedCopy") || "未作成"}

出力条件:
- そのまま入力欄へ貼り付けやすい文章にする
- 箇条書きを中心に簡潔に整理する
- 推測で補完した内容は「仮説」と明記する
- 最後に、追加で確認すべき質問を3つ以内で出す`;
}

function saveProject() {
  persistProject("保存済み");
}

function projectDisplayName(project) {
  return project?.serviceName || project?.name || "名称未設定の案件";
}

function renderCurrentProjectLabel() {
  const project = currentProject();
  $("currentProjectLabel").textContent = project ? `現在の案件: ${projectDisplayName(project)}` : "案件未選択";
  const projectName = project ? projectDisplayName(project) : "";
  document.querySelectorAll("[data-project-title]").forEach((element) => {
    element.textContent = projectName ? `：${projectName}` : "";
  });
}

function loadProjectIntoForm(project) {
  fields.forEach((id) => {
    if ($(id)) $(id).value = project?.[id] || "";
  });
  state.references = project?.references || [];
  state.mainReference = project?.mainReference || null;
  state.checks = project?.checks || {};
  state.selections = project?.selections || {};
  state.selectionNotes = project?.selectionNotes || {};
  renderReferences();
  renderReferencePicker();
  renderChecklist();
  renderOptionGroups();
  renderCurrentProjectLabel();
  updateRequiredFieldStates();
}

function renderProjects() {
  const list = $("projectList");
  if (!list) return;
  if (!state.projects.length) {
    list.innerHTML = '<p class="reference-url">まだ案件がありません。新規案件を作成してください。</p>';
    return;
  }
  list.innerHTML = state.projects
    .map((project) => {
      const progress = projectProgress(project);
      const updated = project.updatedAt ? new Date(project.updatedAt).toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" }) : "-";
      return `
        <article class="project-card ${project.id === state.currentProjectId ? "selected-main" : ""}">
          <div class="project-card-main">
            <div class="project-title">${escapeHtml(projectDisplayName(project))}</div>
            <div class="project-meta">最終更新日: ${escapeHtml(updated)}</div>
            <div class="project-meta">現在取り組むべき工程: ${escapeHtml(progress.next.replace(/^次: /, ""))}</div>
            <div class="project-card-progress" role="progressbar" aria-label="${escapeHtml(projectDisplayName(project))}の進捗" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}">
              <span style="width: ${progress.percent}%"></span>
            </div>
          </div>
          <div class="project-meta project-progress">全体進捗 ${progress.percent}%${project.id === state.currentProjectId ? "・開いています" : ""}</div>
          <button type="button" data-open-project="${project.id}">開く</button>
          <button class="secondary" type="button" data-duplicate-project="${project.id}">複製</button>
          <button class="danger" type="button" data-delete-project="${project.id}">削除</button>
        </article>
      `;
    })
    .join("");
}

function createBlankProject(name = "新規LP案件") {
  return {
    id: createId(),
    name,
    serviceName: name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    mainReference: null,
    references: [],
    checks: {},
    selections: {},
    selectionNotes: {},
    progressFlags: {}
  };
}

function openProject(projectId) {
  saveCurrentProjectFromForm();
  state.currentProjectId = projectId;
  loadProjectIntoForm(currentProject());
  localStorage.setItem("lpWizardData", JSON.stringify(buildAllData()));
  renderProjects();
  switchStep("brief");
  setStatus("案件を開きました");
}

function createProject() {
  saveCurrentProjectFromForm();
  const project = createBlankProject(`新規LP案件 ${state.projects.length + 1}`);
  state.projects.push(project);
  state.currentProjectId = project.id;
  loadProjectIntoForm(project);
  persistProject("案件作成済み");
  switchStep("brief");
}

function duplicateProject(projectId) {
  saveCurrentProjectFromForm();
  const source = state.projects.find((project) => project.id === projectId);
  if (!source) return;
  const copy = {
    ...JSON.parse(JSON.stringify(source)),
    id: createId(),
    name: `${projectDisplayName(source)} のコピー`,
    serviceName: `${projectDisplayName(source)} のコピー`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  state.projects.push(copy);
  state.currentProjectId = copy.id;
  loadProjectIntoForm(copy);
  persistProject("複製済み");
  switchStep("brief");
}

function deleteProject(projectId) {
  if (!confirm("この案件を削除しますか？")) return;
  state.projects = state.projects.filter((project) => project.id !== projectId);
  if (!state.projects.length) {
    const project = createBlankProject();
    state.projects.push(project);
    state.currentProjectId = project.id;
    loadProjectIntoForm(project);
  }
  if (state.currentProjectId === projectId) {
    state.currentProjectId = state.projects[0]?.id || null;
    loadProjectIntoForm(currentProject());
  }
  localStorage.setItem("lpWizardData", JSON.stringify(buildAllData()));
  renderProjects();
  renderCurrentProjectLabel();
  setStatus("削除済み");
}

function applyAllData(data) {
  state.projects = (data.projects || []).map((project) => ({
    ...project,
    progressFlags: project.progressFlags || {}
  }));
  state.currentProjectId = data.currentProjectId || state.projects[0]?.id || null;
  state.favorites = data.favorites || [];
  if (!state.projects.length) {
    const project = createBlankProject();
    state.projects.push(project);
    state.currentProjectId = project.id;
  }
  loadProjectIntoForm(currentProject());
  renderProjects();
  renderFavorites();
  renderReferencePicker();
  localStorage.setItem("lpWizardData", JSON.stringify(buildAllData()));
  setStatus("読み込み済み");
}

function applyProjectData(data) {
  saveCurrentProjectFromForm();
  const project = {
    ...data,
    id: data.id || createId(),
    name: data.name || data.serviceName || "読み込み案件",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progressFlags: data.progressFlags || {}
  };
  state.projects.push(project);
  state.currentProjectId = project.id;
  loadProjectIntoForm(project);
  persistProject("案件読み込み済み");
}

function downloadText(filename, text, type = "text/plain") {
  const blob = new Blob([text], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function currentProjectMarkdown(includePrompts = true) {
  saveCurrentProjectFromForm();
  const project = currentProject();
  if (!project) return "";
  const progress = projectProgress(project);
  return `# ${projectDisplayName(project)}

- 更新日: ${project.updatedAt || new Date().toISOString()}
- 進捗: ${progress.percent}%

## 案件概要

${briefText()}

## 参考LP

${referencesText()}

## LP構成・原稿

${project.generatedCopy || "未作成"}

## デザイン生成メモ

${project.designAssets || "未登録"}

## デザインガイド

${project.designGuide || "未作成"}
${includePrompts ? `
## 構成・原稿プロンプト

${$("copyPrompt")?.value || "未生成"}

## 画像生成プロンプト

${$("designPrompt")?.value || "未生成"}
` : ""}`;
}

function exportProjectMarkdown() {
  const project = currentProject();
  if (!project) return;
  const safeName = projectDisplayName(project).replace(/[\/:*?"<>|]+/g, "-").replace(/\s+/g, "-");
  downloadText(`${safeName}-LP制作記録.md`, currentProjectMarkdown(true), "text/markdown");
  setStatus("Markdown保存済み");
}

function exportCopyMarkdown() {
  saveCurrentProjectFromForm();
  const project = currentProject();
  if (!project) return;
  const safeName = projectDisplayName(project).replace(/[\/:*?"<>|]+/g, "-").replace(/\s+/g, "-");
  const text = `# ${projectDisplayName(project)} LP構成・原稿

${getFieldValue("generatedCopy") || "まだ原稿が貼り付けられていません。"}

## 生成に使用したプロンプト

${$("copyPrompt")?.value || "未生成"}
`;
  downloadText(`${safeName}-LP原稿.md`, text, "text/markdown");
  setStatus("原稿Markdown保存済み");
}

function exportProject() {
  saveCurrentProjectFromForm();
  const data = buildAllData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lp-wizard-all-data.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("書き出し済み");
}

function exportCurrentProject() {
  saveCurrentProjectFromForm();
  const data = currentProject();
  if (!data) return;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const safeName = projectDisplayName(data).replace(/[\\/:*?"<>|]+/g, "-").replace(/\s+/g, "-");
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeName}-project.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("案件を書き出し済み");
}

function importProject(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result || "{}"));
      if (!data || typeof data !== "object") throw new Error("invalid data");
      if (Array.isArray(data.projects)) {
        if (!confirm("現在の全データを、読み込むバックアップ内容で置き換えますか？")) return;
        applyAllData(data);
      } else {
        if (!confirm("この案件データを新しい案件として追加しますか？")) return;
        applyProjectData(data);
      }
    } catch (_) {
      setStatus("読み込み失敗");
      alert("JSONファイルを読み込めませんでした。");
    }
  };
  reader.readAsText(file);
}

function loadProject() {
  const raw = localStorage.getItem("lpWizardData");
  if (raw) {
    try {
      applyAllData(JSON.parse(raw));
      setStatus("読込済み");
      return;
    } catch (_) {
      localStorage.removeItem("lpWizardData");
      alert("保存データが破損していたため、新しい案件を作成します。バックアップJSONがあれば設定から読み込めます。");
    }
  }

  const oldRaw = localStorage.getItem("lpWizardProject");
  if (oldRaw) {
    const oldData = JSON.parse(oldRaw);
    const migratedProject = {
      ...oldData,
      id: oldData.id || createId(),
      name: oldData.name || oldData.serviceName || "移行済み案件",
      createdAt: oldData.createdAt || new Date().toISOString(),
      updatedAt: oldData.updatedAt || new Date().toISOString()
    };
    state.projects = [migratedProject];
    state.currentProjectId = migratedProject.id;
    state.favorites = oldData.favorites || [];
    loadProjectIntoForm(migratedProject);
    persistProject("移行済み");
    return;
  }

  const project = createBlankProject();
  state.projects = [project];
  state.currentProjectId = project.id;
  loadProjectIntoForm(project);
  persistProject("新規作成済み");
  renderReferences();
  renderFavorites();
  renderReferencePicker();
  renderChecklist();
  renderOptionGroups();
  setStatus("読込済み");
}

function resetProject() {
  if (!confirm("入力内容を初期化しますか？")) return;
  localStorage.removeItem("lpWizardProject");
  localStorage.removeItem("lpWizardData");
  fields.forEach((id) => {
    if ($(id)) $(id).value = "";
  });
  const project = createBlankProject();
  state = {
    projects: [project],
    currentProjectId: project.id,
    mainReference: null,
    references: [],
    favorites: [],
    checks: {},
    selections: {},
    selectionNotes: {}
  };
  renderReferences();
  renderFavorites();
  renderReferencePicker();
  renderChecklist();
  renderOptionGroups();
  renderProjects();
  renderCurrentProjectLabel();
  renderProgress();
  renderSectionProgressSummaries();
  setStatus("初期化済み");
}

function normalizeTags(text) {
  return text
    .split(/[,\s、]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeUrl(url) {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function parseMeta(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const meta = (selector) => doc.querySelector(selector)?.getAttribute("content")?.trim() || "";
  return {
    title: meta('meta[property="og:title"]') || meta('meta[name="twitter:title"]') || doc.querySelector("title")?.textContent?.trim() || "",
    description: meta('meta[property="og:description"]') || meta('meta[name="description"]') || "",
    keywords: meta('meta[name="keywords"]') || ""
  };
}

function suggestTagsFromText(text) {
  const rules = [
    ["カフェ", ["カフェ", "cafe", "coffee", "珈琲", "スイーツ", "パフェ", "抹茶", "苺", "いちご"]],
    ["美容", ["美容", "サロン", "エステ", "コスメ", "スキンケア", "ヘア"]],
    ["医療", ["クリニック", "歯科", "医療", "病院", "治療"]],
    ["教育", ["講座", "スクール", "学習", "教材", "セミナー"]],
    ["BtoB", ["法人", "SaaS", "DX", "業務", "管理", "クラウド"]],
    ["EC", ["通販", "EC", "オンラインショップ", "購入", "販売"]],
    ["予約", ["予約", "来店", "受付"]],
    ["キャンペーン", ["キャンペーン", "限定", "特典", "先着"]],
    ["かわいい", ["かわいい", "可愛い", "kawaii", "キュート"]],
    ["高級感", ["高級", "プレミアム", "上質", "ラグジュアリー"]],
    ["信頼感", ["安心", "信頼", "実績", "導入", "保証"]],
    ["季節感", ["春", "夏", "秋", "冬", "季節", "限定", "桜", "クリスマス"]],
    ["和風", ["和", "和風", "抹茶", "日本", "京都", "宇治"]],
    ["モバイル向け", ["スマホ", "モバイル", "アプリ"]]
  ];
  const lowerText = text.toLowerCase();
  return rules
    .filter(([, words]) => words.some((word) => lowerText.includes(word.toLowerCase())))
    .map(([tag]) => tag);
}

function mergeTags(current, additions) {
  return [...new Set([...normalizeTags(current), ...additions])].join(", ");
}

async function fetchTextWithFallback(url) {
  const timeoutMs = 2500;
  const fetchWithTimeout = async (targetUrl) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(targetUrl, { signal: controller.signal });
      if (!response.ok) throw new Error("fetch failed");
      return await response.text();
    } finally {
      clearTimeout(timeout);
    }
  };

  try {
    return await fetchWithTimeout(url);
  } catch (_) {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    return await fetchWithTimeout(proxyUrl);
  }
}

function titleFromUrl(url) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname || "";
  } catch (_) {
    return "";
  }
}

function fillFavoriteTitleFromUrl() {
  const rawUrl = getFieldValue("favoriteUrl");
  if (!rawUrl) return false;
  const url = normalizeUrl(rawUrl);
  $("favoriteUrl").value = url;
  if (!getFieldValue("favoriteTitle")) {
    $("favoriteTitle").value = titleFromUrl(url);
  }
  scheduleAutoSave();
  return true;
}

async function fetchFavoriteMeta() {
  const rawUrl = getFieldValue("favoriteUrl");
  const status = $("favoriteMetaStatus");
  const button = $("fetchFavoriteMeta");
  if (!rawUrl) {
    status.textContent = "先にURLを入力してください。";
    return;
  }

  const url = normalizeUrl(rawUrl);
  fillFavoriteTitleFromUrl();
  status.textContent = "URLから仮のサイト名を入力しました。外部情報も短時間だけ確認します。";
  button.disabled = true;
  button.textContent = "取得中";

  try {
    const html = await fetchTextWithFallback(url);
    const meta = parseMeta(html);
    const tagText = `${meta.title} ${meta.description} ${meta.keywords} ${url}`;
    const suggestedTags = suggestTagsFromText(tagText);

    if (meta.title && !getFieldValue("favoriteTitle")) {
      $("favoriteTitle").value = meta.title;
    }
    $("favoriteTags").value = mergeTags(getFieldValue("favoriteTags"), suggestedTags);

    status.textContent = meta.title
      ? "取得しました。必要に応じてサイト名やタグを調整してください。"
      : "ページは取得できましたが、サイト名は見つかりませんでした。手入力してください。";
    scheduleAutoSave();
  } catch (_) {
    status.textContent = "外部情報は取得できませんでした。URLから仮のサイト名だけ入力しました。必要に応じて手入力してください。";
    scheduleAutoSave();
  } finally {
    button.disabled = false;
    button.textContent = "URL情報を取得";
  }
}

function addFavorite() {
  const title = getFieldValue("favoriteTitle");
  const url = getFieldValue("favoriteUrl");
  const category = getFieldValue("favoriteCategory");
  const product = getFieldValue("favoriteProduct");
  const tags = normalizeTags(getFieldValue("favoriteTags"));
  const defaultUse = $("favoriteUse").value;
  if (!title && !url) return;
  const normalized = normalizeUrl(url);
  if (normalized && state.favorites.some((favorite) => normalizeUrl(favorite.url) === normalized)) {
    alert("同じURLはすでにお気に入りLPに登録されています。");
    return;
  }
  state.favorites.push({
    title: title || "名称未設定",
    url: normalized || "URL未設定",
    category,
    product,
    tags,
    defaultUse
  });
  $("favoriteTitle").value = "";
  $("favoriteUrl").value = "";
  $("favoriteCategory").value = "";
  $("favoriteProduct").value = "";
  $("favoriteTags").value = "";
  renderFavorites();
  renderReferencePicker();
  persistProject();
}

function favoriteToReference(index) {
  const favorite = state.favorites[index];
  if (!favorite) return null;
  return {
    title: favorite.title,
    url: favorite.url,
    type: favorite.defaultUse,
    category: favorite.category,
    product: favorite.product,
    tags: favorite.tags || []
  };
}

function setMainFavorite(index) {
  const reference = favoriteToReference(index);
  if (!reference) return;
  state.mainReference = reference;
  renderReferences();
  persistProject("メイン反映・自動保存済み");
}

function addSupportFavorite(index) {
  const reference = favoriteToReference(index);
  if (!reference) return;
  if (state.references.some((item) => item.url === reference.url)) {
    setStatus("すでに補助参考へ追加済みです");
    return;
  }
  state.references.push({
    ...reference
  });
  renderReferences();
  persistProject("補助反映・自動保存済み");
}

function removeFavorite(index) {
  state.favorites.splice(index, 1);
  renderFavorites();
  renderReferencePicker();
  persistProject();
}

function suggestFavorites() {
  const source = [
    briefText(),
    getFieldValue("productDescription"),
    getFieldValue("targetAudience"),
    getFieldValue("valueProposition"),
    getFieldValue("designDirection")
  ].join(" ");
  const scored = state.favorites
    .map((favorite, originalIndex) => {
      const score = favorite.tags.reduce((total, tag) => total + (source.includes(tag) ? 1 : 0), 0);
      return { ...favorite, originalIndex, score };
    })
    .filter((favorite) => favorite.score > 0)
    .sort((a, b) => b.score - a.score);

  renderReferencePicker(scored.length ? scored : filteredFavorites("picker"));
  setStatus(scored.length ? "候補表示" : "全件表示");
}

function mergeText(current, additions) {
  const cleanAdditions = additions.filter(Boolean);
  if (!cleanAdditions.length) return current;
  const additionText = cleanAdditions.join("、");
  if (!current) return additionText;
  return current.includes(additionText) ? current : `${current}\n${additionText}`;
}

function openAiModal() {
  $("aiModal").classList.add("is-open");
  $("aiModal").setAttribute("aria-hidden", "false");
}

function closeAiModal() {
  $("aiModal").classList.remove("is-open");
  $("aiModal").setAttribute("aria-hidden", "true");
}

function applyAiAnswer() {
  const answer = getFieldValue("aiConsultAnswer");
  const target = $("aiApplyTarget").value;
  if (!answer || !$(target)) return;
  $(target).value = mergeText($(target).value.trim(), [answer]);
  persistProject("反映済み");
}

function setupRequiredFields() {
  Object.entries(requiredFields).forEach(([id, labelText]) => {
    const field = $(id);
    if (!field) return;

    field.required = true;
    field.setAttribute("aria-required", "true");

    const label = field.closest("label");
    if (label && !label.querySelector(".required-badge")) {
      const badge = document.createElement("span");
      badge.className = "required-badge";
      badge.textContent = "必須";
      badge.setAttribute("aria-label", `${labelText}は入力必須です`);
      label.insertBefore(badge, label.firstChild.nextSibling);
    }
  });
  updateRequiredFieldStates();
}

function updateRequiredFieldState(field) {
  if (!field || !requiredFields[field.id]) return;
  const isEmpty = !field.value.trim();
  field.classList.toggle("is-required-empty", isEmpty);
  field.classList.toggle("is-required-filled", !isEmpty);
  const label = field.closest("label");
  if (label) label.classList.toggle("has-required-empty", isEmpty);
}

function updateRequiredFieldStates() {
  Object.keys(requiredFields).forEach((id) => updateRequiredFieldState($(id)));
}

function enhanceEditButtons() {
  document.querySelectorAll(".form-grid label").forEach((label) => {
    if (label.querySelector(".edit-field-button")) return;
    const field = label.querySelector("input, textarea, select");
    if (!field) return;
    const button = document.createElement("button");
    button.className = "edit-field-button";
    button.type = "button";
    button.textContent = "編集";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      field.focus();
    });
    label.appendChild(button);
  });
}

document.querySelectorAll(".step").forEach((button) => {
  button.addEventListener("click", () => switchStep(button.dataset.step));
});

document.querySelectorAll("[data-accordion]").forEach((button) => {
  button.addEventListener("click", () => {
    const content = $(button.dataset.accordion);
    const isOpen = content.classList.toggle("is-open");
    button.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.addEventListener("input", (event) => {
  if (requiredFields[event.target.id]) updateRequiredFieldState(event.target);
  if (fields.includes(event.target.id)) {
    renderProgress();
    renderSectionProgressSummaries();
    scheduleAutoSave();
  }
  const noteKey = event.target.dataset.optionNote;
  if (noteKey) {
    state.selectionNotes[noteKey] = event.target.value.trim();
    renderProgress();
    renderSectionProgressSummaries();
    scheduleAutoSave();
  }
});

$("createProject").addEventListener("click", createProject);
$("projectList").addEventListener("click", (event) => {
  const openId = event.target.dataset.openProject;
  const duplicateId = event.target.dataset.duplicateProject;
  const deleteId = event.target.dataset.deleteProject;
  if (openId) openProject(openId);
  if (duplicateId) duplicateProject(duplicateId);
  if (deleteId) deleteProject(deleteId);
});

document.addEventListener("change", (event) => {
  const groupKey = event.target.dataset.optionGroup;
  if (!groupKey) return;
  const values = [...document.querySelectorAll(`[data-option-group="${groupKey}"]:checked`)].map((input) => input.value);
  state.selections[groupKey] = values;
  renderProgress();
  renderSectionProgressSummaries();
  scheduleAutoSave();
});

$("addFavorite").addEventListener("click", addFavorite);
$("fetchFavoriteMeta").addEventListener("pointerdown", () => {
  fillFavoriteTitleFromUrl();
  $("favoriteMetaStatus").textContent = "URLから仮のサイト名を入力しました。外部情報を取得します。";
});
$("fetchFavoriteMeta").addEventListener("click", fetchFavoriteMeta);
$("favoriteUrl").addEventListener("change", () => {
  if (fillFavoriteTitleFromUrl()) {
    $("favoriteMetaStatus").textContent = "URLから仮のサイト名を入力しました。必要ならURL情報を取得してください。";
  }
});
$("favoriteUrl").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchFavoriteMeta();
  }
});
$("suggestFavorites").addEventListener("click", suggestFavorites);
$("favoriteList").addEventListener("click", (event) => {
  const removeIndex = event.target.dataset.removeFavorite;
  if (removeIndex !== undefined) removeFavorite(Number(removeIndex));
});

["favoriteSearch", "favoriteCategoryFilter", "favoriteUseFilter"].forEach((id) => {
  $(id).addEventListener("input", () => renderFavorites());
  $(id).addEventListener("change", () => renderFavorites());
});

["referenceSearch", "referenceCategoryFilter", "referenceUseFilter"].forEach((id) => {
  $(id).addEventListener("input", () => renderReferencePicker());
  $(id).addEventListener("change", () => renderReferencePicker());
});

$("referencePickerList").addEventListener("click", (event) => {
  const mainIndex = event.target.dataset.setMainFavorite;
  const supportIndex = event.target.dataset.addSupportFavorite;
  if (mainIndex !== undefined) setMainFavorite(Number(mainIndex));
  if (supportIndex !== undefined) addSupportFavorite(Number(supportIndex));
});

$("selectedReferenceList").addEventListener("click", (event) => {
  if (event.target.dataset.clearMainReference) {
    state.mainReference = null;
    renderReferences();
    persistProject("メイン解除・自動保存済み");
    return;
  }
  const index = event.target.dataset.removeReference;
  if (index === undefined) return;
  state.references.splice(Number(index), 1);
  renderReferences();
  persistProject();
});

$("canvaChecklist").addEventListener("change", (event) => {
  const index = event.target.dataset.check;
  if (index === undefined) return;
  state.checks[index] = event.target.checked;
  persistProject();
});

$("generateCopyPrompt").addEventListener("click", generateCopyPrompt);
$("generateDesignPrompt").addEventListener("click", generateDesignPrompt);
$("generateGuidePrompt").addEventListener("click", generateGuidePrompt);
$("generateAiConsultPrompt").addEventListener("click", generateAiConsultPrompt);
$("exportCurrentProject").addEventListener("click", exportCurrentProject);
$("exportProjectMarkdown").addEventListener("click", exportProjectMarkdown);
$("exportCopyMarkdown").addEventListener("click", exportCopyMarkdown);
$("exportProject").addEventListener("click", exportProject);
$("importProject").addEventListener("change", (event) => {
  importProject(event.target.files?.[0]);
  event.target.value = "";
});
document.querySelectorAll("[data-ai-consult-button]").forEach((button) => {
  button.addEventListener("click", openAiModal);
});
$("closeAiConsult").addEventListener("click", closeAiModal);
$("applyAiAnswer").addEventListener("click", applyAiAnswer);
$("clearAiAnswer").addEventListener("click", () => {
  $("aiConsultAnswer").value = "";
  setStatus("回答欄クリア");
});
$("aiConsultTheme").addEventListener("change", syncConsultTarget);
$("aiModal").addEventListener("click", (event) => {
  if (event.target.id === "aiModal") closeAiModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAiModal();
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = $(button.dataset.copyTarget);
    try {
      await navigator.clipboard.writeText(target.value);
    } catch (_) {
      target.focus();
      target.select();
      document.execCommand("copy");
    }
    setStatus("コピー済み");
  });
});

loadProject();
renderFavorites();
renderReferencePicker();
renderOptionGroups();
renderConsultThemes();
setupRequiredFields();
setupSectionProgressSummaries();
setupStepNavigation();
enhanceEditButtons();
renderProgress();
