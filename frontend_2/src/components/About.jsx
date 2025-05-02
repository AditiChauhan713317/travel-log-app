function About() {

    return (
        <div className="text-center p-4 flex flex-col gap-3 items-center">
            <h1 className="text-5xl">🌍 Wander through worlds, real or imagined</h1>
            <p className="text-lg ">This isn't just a travel log—it's a memory machine. Jot your journeys, daydream your detours, and let your words trace maps no GPS can find. Whether you’re recounting a real adventure or crafting one from thin air, this space is yours to explore.</p>
            <div className="flex flex-col gap-4 mt-7 md:flex-row">
                <div className="p-3 border rounded-2xl custom-shadow transition-transform duration-700 ease-out hover:translate-x-3 bg-[#fda674]">Map it — where were you?</div>
                <div className="p-3 border rounded-2xl custom-shadow transition-transform duration-700 ease-out hover:translate-x-3 bg-[#69B6D9]">Taste the trip — what did you eat?</div>
                <div className="p-3 border rounded-2xl custom-shadow transition-transform duration-700 ease-out hover:translate-x-3 bg-[#DE92D0]">Set the mood — what were the vibes?</div>
                <div className="p-3 border rounded-2xl custom-shadow transition-transform duration-700 ease-out hover:translate-x-3 bg-[#76B947]">Live a little — what did you get up to?</div>
            </div>
        </div>
    )

}
export default About;