'use client'

import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface IErrorStateProps {
  error: Error
}

const ErrorState = ({ error }: IErrorStateProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <EmptyState
      title='Uh oh'
      subtitle='Something went wrong!'
    />
  )
}

export default ErrorState