import type { ProjectCategory } from '#/content/work'

/**
 * Generic wireframes used where a project has no cleared screenshot. They are drawn
 * from scratch and never depict any real product, so no employer screens are implied.
 */
export function WorkIllustration({ category }: { category: ProjectCategory[] }) {
  const kind = category.includes('fintech') ? 'fintech' : category.includes('mobile') ? 'mobile' : 'web'
  return (
    <svg
      className="work-illustration"
      viewBox="0 0 200 150"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'mobile' && (
        <>
          <rect x="68" y="8" width="64" height="134" rx="10" />
          <path d="M94 15h12" />
          <rect x="76" y="28" width="48" height="26" rx="4" />
          <rect x="76" y="62" width="22" height="22" rx="4" />
          <rect x="102" y="62" width="22" height="22" rx="4" />
          <path d="M76 96h48M76 106h34M76 116h42" />
          <rect x="82" y="124" width="36" height="10" rx="5" />
        </>
      )}
      {kind === 'fintech' && (
        <>
          <rect x="14" y="12" width="172" height="126" rx="8" />
          <path d="M14 34h172" />
          <circle cx="26" cy="23" r="2.5" />
          <rect x="26" y="46" width="70" height="34" rx="5" />
          <path d="M34 56h30M34 66h18" />
          <rect x="104" y="46" width="70" height="34" rx="5" />
          <path d="M112 56h30M112 66h22" />
          <path d="M26 96h148M26 110h148M26 124h148" />
          <path d="M150 96v28" />
          <path d="M44 102l8 6 8-4 8 5" />
        </>
      )}
      {kind === 'web' && (
        <>
          <rect x="14" y="12" width="172" height="126" rx="8" />
          <path d="M14 34h172" />
          <circle cx="26" cy="23" r="2.5" />
          <circle cx="36" cy="23" r="2.5" />
          <rect x="24" y="46" width="100" height="14" rx="4" />
          <rect x="24" y="68" width="48" height="56" rx="5" />
          <rect x="78" y="68" width="48" height="56" rx="5" />
          <rect x="134" y="46" width="42" height="78" rx="5" />
          <path d="M32 80h32M32 90h20M86 80h32M86 90h24" />
        </>
      )}
    </svg>
  )
}
