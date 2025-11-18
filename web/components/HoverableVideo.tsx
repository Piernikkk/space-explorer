interface HoverableVideoProps extends React.ComponentProps<"video"> {
  desctiption: string;
  showDescription: boolean;
}

export default function HoverableVideo({
  desctiption,
  showDescription,
  ...props
}: HoverableVideoProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {showDescription && (
        <div className="overflow-auto absolute top-0 right-0 left-0 bottom-0 bg-background/60 transition-opacity duration-300 z-10 flex flex-col p-10">
          <div>{desctiption}</div>
        </div>
      )}
      <video {...props} />
    </div>
  );
}
