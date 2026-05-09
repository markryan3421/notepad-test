import { PenSquareIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
    >
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{note.content}</p>
          <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
        </CardContent>
        <CardFooter>
          <div className='flex gap-2'>
            <PenSquareIcon className='size-4' />
            <button className='btn btn-ghost btn-sm text-error'>
              <TrashIcon className='size-4' />
            </button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default NoteCard