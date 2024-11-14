import { ErrorTooltip } from '@/components/error-tooltip'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ImageIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { type ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type ImageData = {
  name: string
  url: string
}
export function InputFile() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const { control, setValue } = useFormContext()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage({
        name: file.name,
        url: URL.createObjectURL(file),
      })
    }
    e.target.value = ''
  }

  const clearImage = () => {
    setSelectedImage(null)
    setValue('imagem', null)
  }

  return (
    <FormField
      control={control}
      name="imagem"
      render={({ field: { value, onChange, ...fieldProps }, fieldState }) => (
        <FormItem className="relative">
          <FormControl className="peer">
            <FormLabel className="relative flex flex-col gap-2">
              <Input
                className="absolute inset-0 z-10 h-full w-full p-0 opacity-0"
                type="file"
                accept="image/*"
                onChange={e => {
                  handleImageChange(e)
                  onChange(e.target.files?.[0])
                }}
                {...fieldProps}
              />
              <div className="flex gap-2">
                <ImageIcon size={16} />
                <span> Cover Photo</span>
              </div>
              {selectedImage ? (
                <div className="relative flex h-40 w-full flex-col items-center justify-center rounded-md border border-dashed ">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    width={192}
                    height={154}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative flex h-40 w-full flex-col items-center justify-center rounded-md border border-dashed">
                  <UploadCloudIcon size={40} className="text-primary" />
                  <h2 className="text-center text-muted-foreground text-xs">
                    PNG, JPG or BMP, max size 5MB
                  </h2>
                  <h4 className="text-center font-medium text-card-foreground text-sm">
                    Arraste ou clique para fazer upload
                  </h4>
                </div>
              )}
            </FormLabel>
          </FormControl>
          <Button
            type="button"
            className={selectedImage ? 'absolute top-6 right-2 z-20' : 'hidden'}
            onClick={clearImage}
            variant="destructive"
            size="icon"
          >
            <XIcon size={16} />
          </Button>
          <ErrorTooltip fieldState={fieldState} />
        </FormItem>
      )}
    />
  )
}
