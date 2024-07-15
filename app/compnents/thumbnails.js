import Image from "next/image"
export default function Thumbnails({actions,handleAction}) {
  return (
    <div className="flex gap-2">
        {actions.map((action, index) => <Image key={index} width={50} height={50} src={action.path} onClick={()=>handleAction(action)} alt=""/>)}
    </div>
  )
}
