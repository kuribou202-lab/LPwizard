#!/bin/bash

PROJECT_DIR="/Users/mizuno_pc/Documents/Codex/LP制作自動化"
PORT="8787"
URL="http://localhost:${PORT}/index.html"

clear

if [ ! -d "$PROJECT_DIR" ]; then
  osascript -e 'display dialog "LP制作ウィザードのプロジェクトフォルダが見つかりません。\n\n/Users/mizuno_pc/Documents/Codex/LP制作自動化\n\nフォルダの場所を確認してください。" buttons {"OK"} default button "OK" with icon stop'
  echo "エラー: プロジェクトフォルダが見つかりません。"
  echo "$PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR" || exit 1

echo "LP制作ウィザードを起動しています。"
echo
echo "ブラウザが開かない場合は、以下のURLを開いてください。"
echo "$URL"
echo
echo "終了するには Control + C を押してください。"
echo

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "ポート ${PORT} では、すでにサーバーが起動しています。"
  echo "新しいサーバーは起動せず、ブラウザだけ開きます。"
  open "$URL"
  exit 0
fi

open "$URL"
python3 -m http.server "$PORT"
