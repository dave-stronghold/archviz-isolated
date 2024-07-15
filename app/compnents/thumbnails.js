import Image from "next/image"
export default function Thumbnails({actions,handleAction,transitionRunning}) {
  return (
    <div className={`flex gap-2 ${transitionRunning?'opacity-50':'opacity-100'}`}>
        {actions.map((action, index) => <Image key={index} width={50} height={50} src={action.path} onClick={()=>!transitionRunning&&handleAction(action)} alt=""/>)}
    </div>
  )
}
