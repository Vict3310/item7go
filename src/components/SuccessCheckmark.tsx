export default function SuccessCheckmark({ size = 24 }: { size?: number }) {
  return (
    <svg
      className="checkmark-svg"
      width={size}
      height={size}
      viewBox="0 0 52 52"
    >
      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
      <path className="checkmark-check" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" />
    </svg>
  );
}
