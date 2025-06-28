'use client'
import { useChat } from '@ai-sdk/react'
import { useRef, useState } from 'react'
import Image from 'next/image'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [],
  })

  // Add state for file attachments
  const [files, setFiles] = useState()
  const fileInputRef = useRef(null)

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts?.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>
              case 'tool-invocation':
                return <pre key={`${message.id}-${i}`}>{JSON.stringify(part.toolInvocation, null, 2)}</pre>
            }
          })}
          {message.experimental_attachments
            ?.filter((attachment) => attachment.contentType.startsWith('image/'))
            .map((attachment, index) => (
              <Image
                key={`${message.id}-attachment-${index}`}
                src={attachment.url}
                alt={attachment.name || 'Image attachment'}
                width={400}
                height={300}
                style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '8px', height: 'auto', width: 'auto' }}
              />
            ))}
        </div>
      ))}

      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            allowEmptySubmit: true,
            experimental_attachments: files,
          })
          setFiles(undefined)
          if (fileInputRef.current) fileInputRef.current.value = ''
        }}
      >
        <div className="w-full max-w-md mb-4 flex flex-col gap-5">
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files) setFiles(event.target.files)
            }}
            multiple
            ref={fileInputRef}
          />
          <input
            className="dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button
            className="text-white dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 flex items-center justify-center cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
