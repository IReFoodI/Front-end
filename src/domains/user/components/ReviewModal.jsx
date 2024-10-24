import { StarFilledIcon } from "@radix-ui/react-icons"
import { IconX } from "@tabler/icons-react"
import { useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/app/utils/cn"
import { dateFormatter } from "@/app/utils/dateFormatter"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/avatar"
import { Button } from "@/ui/components/ui/button/button"
import { Textarea } from "@/ui/components/ui/textarea"

export function ReviewModal({ reviewStars }) {
  const [reviewText, setReviewText] = useState("")
  const [stars, setStars] = useState(reviewStars ? reviewStars : null)
  const [hover, setHover] = useState(0)
  const tempStars = useRef(null)
  const maxLengthReview = 300

  function handleUpdateReviewText(e) {
    setReviewText(e?.target?.value)
  }

  function handleStarClick(stars) {
    setStars(stars)
  }

  function handleMouseEnter(index) {
    tempStars.current = stars
    setHover(index + 1)
  }

  function handleMouseLeave() {
    setHover(0)
    setStars(tempStars.current)
  }

  return (
    <AlertDialogContent className="flex min-w-fit flex-col items-center justify-start md:h-80">
      <Avatar className="h-24 w-24 md:absolute md:top-0 md:-translate-y-1/2">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>IM</AvatarFallback>
      </Avatar>

      <p className="flex w-full justify-center opacity-50 md:mt-8">
        {dateFormatter(Date.now())}
      </p>

      <div className="flex h-full w-full flex-col items-center justify-start gap-3 md:flex-row md:items-start md:gap-20">
        <div className="flex w-full flex-col items-center gap-3 md:gap-4">
          <AlertDialogHeader className="flex flex-col justify-center">
            <AlertDialogTitle className="flex w-fit flex-nowrap text-xl">
              Este pedido merece nota 10!
            </AlertDialogTitle>
            <AlertDialogDescription className="!mt-0 text-xs">
              Avalie como foi sua experiência com a loja.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <section className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full">
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <Button
                    key={uuidv4()}
                    onClick={() => handleStarClick(index + 1)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                      "w-full px-2 py-1 text-gray-300 opacity-100 hover:bg-transparent hover:text-primary",
                      (hover ? hover : stars) > index && "text-primary"
                    )}
                    variant="ghost"
                  >
                    <StarFilledIcon width={40} height={40} />
                  </Button>
                )
              })}
            </div>
            <div className="flex w-full items-center justify-between opacity-50">
              <p className="text-sm font-semibold">Não curti</p>
              <p className="text-sm font-semibold">Excelente</p>
            </div>
          </section>
        </div>

        <div className="flex h-full w-full flex-1">
          <section className="flex h-full w-full flex-1 flex-col">
            <p className="font-semibold">Deixar comentário</p>
            <Textarea
              placeholder="Conte-nos um pouco mais sobre o que achou do pedido (opcional)"
              value={reviewText}
              onChange={handleUpdateReviewText}
              maxLength={maxLengthReview}
              className="min-w-72 flex-1 resize-none"
            ></Textarea>
            <footer className="flex w-full items-center justify-between text-sm placeholder-gray-500">
              <p className="text-xs opacity-50">
                Seu comentário vai ajudar muitas pessoas
              </p>
              <p className="text-xs opacity-50">
                {reviewText.length}/{maxLengthReview}
              </p>
            </footer>
          </section>
        </div>
      </div>
      <div className="flex w-full items-center justify-end">
        <AlertDialogAction className="w-full rounded-full md:w-fit md:px-8">
          Enviar avaliação
        </AlertDialogAction>
      </div>

      <AlertDialogCancel className="absolute right-1 top-1 border-none shadow-none hover:bg-accent hover:text-accent-foreground">
        <IconX />
      </AlertDialogCancel>
    </AlertDialogContent>
  )
}
