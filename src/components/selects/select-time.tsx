// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select'

// type ChartSelectTimeProps = {
//   currentTime: string
//   times: {[key: string]: string}[]
//   handleChange: (time: string) => void
//   placeholder: string
// }
// const SelectTime = ({
//   times,
//   currentTime,
//   handleChange,
//   placeholder,
// }: ChartSelectTimeProps) => {
//   const propTime = Object.keys(times[0])[0]

//   return (
//     <Select value={currentTime} onValueChange={handleChange}>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder={placeholder} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           {times.map((time, idx) => (
//             <SelectItem key={idx} value={time[propTime]}>
//               {time[propTime]}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )
// }

// export default SelectTime

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type ChartSelectTimeProps = {
  currentTime: string
  times: { [key: string]: string }[]
  handleChange: (time: string) => void
  placeholder: string
}

const SelectTime = ({
  times,
  currentTime,
  handleChange,
  placeholder,
}: ChartSelectTimeProps) => {
  // ✅ Si "times" est vide, on ne fait rien pour éviter l’erreur
  if (!times || times.length === 0) {
    console.warn('⚠️ SelectTime rendu avec un tableau "times" vide')
    return (
      <Select value={currentTime} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
    )
  }

  const propTime = Object.keys(times[0])[0] // maintenant sûr, car times[0] existe

  return (
    <Select value={currentTime} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {times.map((time, idx) => (
            <SelectItem key={idx} value={time[propTime]}>
              {time[propTime]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectTime

