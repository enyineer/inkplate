import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { IoIosQuote } from "react-icons/io";
import Code from './app/article/[slug]/code';
import { BundledLanguage } from 'shiki';

const langRegEx = new RegExp(/language-(\w+)/);

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (elem) => <h1 className="font-bold text-5xl" {...elem} />,
    h2: (elem) => <h2 className="font-bold text-4xl" {...elem} />,
    h3: (elem) => <h3 className="font-bold text-3xl" {...elem} />,
    h4: (elem) => <h4 className="font-bold text-2xl" {...elem} />,
    h5: (elem) => <h5 className="font-bold text-xl" {...elem} />,
    h6: (elem) => <h6 className="font-bold text-lg" {...elem} />,
    a: (elem) => <Link
      className="text-blue-600 hover:text-blue-800 active:text-blue-400"
      href={elem.href ?? ''}
      {...elem}
    />,
    blockquote: ({ children }) => (
      <blockquote className="p-4 bg-gray-800 bg-opacity-15 italic rounded-md">
        <div className="flex flex-row gap-2">
          <IoIosQuote size={20} />
          <div>{children}</div>
        </div>
      </blockquote>
    ),
    code: async (props) => {
      if (typeof props.children !== 'string') {
        throw new Error(`Invalid type ${typeof props.children} for code element child`);
      }

      let language: BundledLanguage | null = null;
      if (props.className) {
        const langMatches = langRegEx.exec(props.className);
        if (langMatches !== null) {
          language = langMatches[1] as BundledLanguage;
        }
      }

      if (language) {
        return <Code code={props.children} lang={language} theme='dracula' />
      }
      
      return <Code code={props.children} theme='dracula' inline />
    },
    ul: (elem) => <ul className='list-disc' {...elem} />,
    ol: (elem) => <ol className='list-decimal' {...elem} />,
  };
}
