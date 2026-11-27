type Attachment = {
  type?: string; // e.g. "image", "video", "audio"
  mimeType?: string; // e.g. "image/png", "video/mp4"
};

type LastMessage = {
  text?: string;
  attachments?: Attachment[];
  senderId?: string;
};

type Kind = 'image' | 'video' | 'audio' | 'file';

const getKind = (a: Attachment): Kind => {
  const v = (a.mimeType || a.type || '').toLowerCase();
  if (v.startsWith('image')) return 'image';
  if (v.startsWith('video')) return 'video';
  if (v.startsWith('audio')) return 'audio';
  return 'file';
};

const LABELS: Record<Kind, { icon: string; one: string; many: string }> = {
  image: { icon: '📷', one: 'Photo', many: 'photos' },
  video: { icon: '🎥', one: 'Video', many: 'videos' },
  audio: { icon: '🎵', one: 'Audio', many: 'audio files' },
  file: { icon: '📄', one: 'Document', many: 'documents' },
};

export function getLastMessagePreview(msg?: LastMessage | null): string {
  if (!msg) return 'No messages yet';

  const text = msg.text?.trim();
  const attachments = msg.attachments ?? [];

  if (msg.text?.trim()) return msg.text;
  if (attachments.length === 0) return text || '';

  // 2. Count attachments by type
  const counts: Partial<Record<Kind, number>> = {};
  attachments.forEach((a) => {
    const k = getKind(a);
    counts[k] = (counts[k] ?? 0) + 1;
  });
  const kinds = Object.keys(counts) as Kind[];

  // 3. Build the label
  let label: string;
  if (kinds.length === 1) {
    const k = kinds[0];
    const n = counts[k]!;
    label =
      n === 1
        ? `${LABELS[k].icon} ${LABELS[k].one}`
        : `${LABELS[k].icon} ${n} ${LABELS[k].many}`;
  } else {
    label = `📎 ${attachments.length} attachments`;
  }

  return text ? `${label} ${text}` : label;
}
