/**
 * =========================================
 * notes-cli 重要ソースコード解説（読む用）
 * ファイル名: 解説.ts
 * =========================================
 */

/* ===============================
 * Note型（データの設計）
 * =============================== */

/**
 * 1つのノートを表す型
 * - id    : 一意な番号（削除・更新に使う）
 * - title : ノートのタイトル
 * - body  : 本文
 */
type Note = {
  id: number;
  title: string;
  body: string;
};


/* ===============================
 * notes.ts（ロジックの中核）
 * =============================== */

/**
 * notes 配列
 * → アプリが扱う「全ノートの集合」
 * → 永続化（保存）は storage 層が担当
 */
const notes: Note[] = [];

/**
 * 配列の最後の要素を取得
 * at(-1) は「末尾」を意味する
 * - 配列が空なら undefined
 */
const last = notes.at(-1);

/**
 * 次に使うIDを決める処理
 *
 * notes が空:
 *   → 最初のノートなので ID = 1
 *
 * notes がある:
 *   → 最後のノートの id に +1
 *
 * なぜこうする？
 * - 配列の長さではなく「id基準」にすることで
 *   削除があってもIDが衝突しない
 */
const nextId =
  last === undefined
    ? 1
    : last.id + 1;

/**
 * ノート追加処理
 * - 新しい Note を作って配列に push
 */
function addNote(title: string, body: string): Note {
  const note: Note = {
    id: nextId,
    title,
    body,
  };

  notes.push(note);
  return note;
}


/* ===============================
 * 更新処理（イミュータブル）
 * =============================== */

/**
 * 指定した id のノートだけを書き換える
 *
 * map を使う理由:
 * - 元の配列を壊さない（イミュータブル）
 * - 差分だけ変更できる
 */
function updateNote(id: number, body: string): Note[] {
  return notes.map((note) =>
    note.id === id
      ? { ...note, body } // ← 対象だけ新しいオブジェクトにする
      : note              // ← それ以外はそのまま
  );
}


/* ===============================
 * storage/file.ts（永続化）
 * =============================== */

/**
 * fs:
 * - ファイルの読み書き
 *
 * path:
 * - OSごとのパス差異を吸収
 *
 * process:
 * - 環境変数（HOMEなど）にアクセス
 */
import fs from "fs";
import path from "path";

/**
 * 設定ディレクトリ
 * ~/.config/notes-cli
 *
 * CLIツールはここにデータを保存するのが作法
 */
const dir = path.join(process.env.HOME!, ".config/notes-cli");

/**
 * 保存ファイルのパス
 */
const filePath = path.join(dir, "notes.json");

/**
 * ノートを保存
 * - JSON.stringify で文字列化
 * - fs.writeFileSync で即書き込み
 */
function saveNotes(notes: Note[]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify(notes, null, 2),
    "utf-8"
  );
}

/**
 * ノートを読み込む
 * - ファイルがなければ空配列
 */
function loadNotes(): Note[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Note[];
}


/* ===============================
 * CLI設計の思想（重要）
 * =============================== */

/**
 * この構成のポイント
 *
 * core/
 *   → ロジックだけ（純粋関数）
 *
 * storage/
 *   → 保存・読み込みだけ
 *
 * cli/
 *   → 引数解析・表示だけ
 *
 * なぜ分ける？
 * - テストしやすい
 * - CLI以外（GUI/Web）にも再利用できる
 * - 「ロジックとI/Oを混ぜない」
 */

