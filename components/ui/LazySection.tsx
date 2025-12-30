import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
    children: ReactNode;
    threshold?: number;
    rootMargin?: string;
    className?: string;
    minHeight?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
    children,
    threshold = 0.1,
    rootMargin = "200px",
    className = "",
    minHeight = "400px"
}) => {
    const [isIntersecting, setIntersecting] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return (
        <div
            ref={sectionRef}
            className={className}
            style={{
                minHeight: isIntersecting ? 'auto' : minHeight,
                contentVisibility: isIntersecting ? 'visible' : 'auto',
                containIntrinsicSize: `1px ${minHeight}`
            }}
        >
            {isIntersecting ? children : <div className="w-full h-full bg-gray-50/50 animate-pulse" />}
        </div>
    );
};

export default LazySection;