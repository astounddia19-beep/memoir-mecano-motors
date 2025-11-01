import { NextRequest, NextResponse } from "next/server"
import { z, ZodSchema } from "zod"
import { handleError } from "./error-handler"

export function validateRequest<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ")
      return { success: false, error: errorMessage }
    }
    return { success: false, error: "Erreur de validation" }
  }
}

export function createValidationMiddleware<T>(schema: ZodSchema<T>) {
  return (handler: (req: NextRequest, validatedData: T) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      try {
        const body = await req.json()
        const validation = validateRequest(schema, body)

        if (!validation.success) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 }
          )
        }

        return await handler(req, validation.data)
      } catch (error) {
        const { message, statusCode } = handleError(error)
        return NextResponse.json(
          { error: message },
          { status: statusCode }
        )
      }
    }
  }
}

export function validateQueryParams<T>(schema: ZodSchema<T>, params: URLSearchParams) {
  const data = Object.fromEntries(params.entries())
  return validateRequest(schema, data)
}

