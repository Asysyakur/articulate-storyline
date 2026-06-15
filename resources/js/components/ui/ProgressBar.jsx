export default function ProgressBar() { 
  return ( 
  <div> 
    <div className="flex justify-between text-sm mb-2"> 
      <span>Progress Belajar</span> 
      <span>40%</span> 
      </div> 
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden"> 
<div className="w-[40%] h-full bg-cyan-400 rounded-full" /> 
</div> 
</div> 
); 
}