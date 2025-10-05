type Props = {
  answered: number
  total: number
}
export default function ProgressBadge({ answered, total }: Props) {
  return (
    <span className="badge" aria-live="polite">
      {answered}/{total} answered
    </span>
  )
}
