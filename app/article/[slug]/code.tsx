import type { BundledLanguage, BundledTheme } from "shiki";
import { getHighlighter } from "shiki";

interface CodeProps {
  code: string;
  theme: BundledTheme;
  lang?: BundledLanguage;
  inline?: boolean;
}

export default async function Code(props: CodeProps) {
  if (props.inline) {

    if (props.lang) {
      throw new Error(`Syntax highlighting (setting a language) is not supported in inline mode`);
    }

    return (
      <code
        className='font-mono text-blue-400 bg-blue-50 text-[0.9rem] p-[2px] rounded'
      >
        {props.code}
      </code>
    )
  }

  if (!props.lang) {
    throw new Error(`Need to set a language for codeblock if not inline`);
  }

  const highlighter = await getHighlighter({
    langs: [props.lang],
    themes: [props.theme],
  });

  const html = await highlighter.codeToHtml(props.code, {
    lang: props.lang,
    theme: props.theme,
  });

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className='text-[0.9rem] font-mono'
    />
  );
}
