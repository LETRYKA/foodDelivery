import { ArrowUpRight } from "lucide-react"

const Banner = () => {
	return (
		<>
			<div className="w-full h-60 bg-[#6E62E5] rounded-[var(--radius)] flex flex-col justify-center items-start pl-7">
				<p className="text-sm text-[var(--background)] tracking-wider my-3">ONLINE ORDER</p>
				<h1 className="text-4xl text-[var(--background)] font-semibold leading-9">Sharpen Your Skills with<br />Professional Online Courses</h1>
				<button className="bg-[#131311] mt-5 pl-6 pr-3 cursor-pointer group py-[10px] rounded-4xl flex flex-row justify-center items-center gap-3 relative">
					<p className="text-sm text-[var(--background)] transition-all duration-400 ease-in-out group-hover:translate-x-6">JoinNow</p>
					<div className="transition-all duration-400 ease-in-out group-hover:-translate-x-20 w-6 h-6 bg-[var(--background)] rounded-4xl flex justify-center items-center">
						<ArrowUpRight width={14} />
					</div>
				</button>
			</div>
		</>
	)
}

export default Banner