import { useInView } from "../hooks/useInView";

export function Reveal({ as: Tag = "div", className = "", children }) {
  const [ref, isVisible] = useInView();

  return (
    <Tag
      ref={ref}
      className={`fade-in-up ${isVisible ? "visible" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
