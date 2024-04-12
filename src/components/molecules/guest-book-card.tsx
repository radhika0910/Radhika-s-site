type GuestBookRowProps = {
  data: { user: { name: string } } & { createdAt: Date; desc: string; id: string }
}

export const GuestBookRow = ({ data }: GuestBookRowProps) => {
  return (
    <div className='flex lg:flex-row flex-col items-start gap-x-2 py-2 lg:py-0 md:text-sm text-xs'>
      <div className='text-muted-foreground lg:w-36 truncate'>
        <span>{data.user.name}</span>
      </div>
      <div className='hidden lg:block'>:</div>
      <div className='flex-1 whitespace-pre-line'>{data.desc}</div>
      <div className='text-muted-foreground'>
        {data.createdAt.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  )
}
