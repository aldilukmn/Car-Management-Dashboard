type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export default function SignImg({src, alt, className, onClick}: ImgProps) {
  return (
    <>
      <img src={src} alt={alt} className={className} onClick={onClick}/>
    </>
  )
}