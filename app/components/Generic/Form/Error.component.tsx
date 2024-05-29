'use client';

import { useLayoutEffect, useRef, useState } from 'react';

export interface ErrorProps {
    error?: string;
    className?: string;
}

export const Error = ({ error, className = '', ...rest }: ErrorProps): JSX.Element => {
  const errorRef = useRef<HTMLSpanElement | null>(null);
  const [errorHeight, setErrorHeight] = useState(0);
  const [transitionEnded, setTransitionEnded] = useState(false);
  useLayoutEffect(() => {
    const element = errorRef.current;
    if (error && element) {
      const { height } = element.getBoundingClientRect();
      setErrorHeight(height);
    }

    if (!error) {
      setErrorHeight(0);
    }
  }, [error]);

  return (
    <div
      className={`
        transition-[padding] duration-300 
        ${ error ? 'py-xxxs' : 'pt-0' }
      `}
    >
      <div
        style={{ height: transitionEnded ? 'auto' : `${errorHeight}px` }}
        onTransitionEnd={() => setTransitionEnded(true)}
        className="duration-300 transition-[height]"
      >
        {error && (
          <span
            {...rest}
            ref={errorRef}
            className={`
              duration-300 transition-opacity text-red text-regular block
              ${ errorHeight ? 'opacity-1' : 'opacity-0'}
            `}
          >
            <>{error}</>
          </span>
        )}
      </div>
    </div>
  );
};
