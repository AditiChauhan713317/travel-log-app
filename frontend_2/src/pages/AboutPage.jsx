import About from "../components/About";



function AboutPage() {



    return (
     
        <> 
        <div className="flex flex-col justify-center items-center m-10 ">
           <span className="text-lg">
            Turn your adventures into stories in 3 easy steps- ✨<br/>
            <br />
            🗺️ Answer a Few Questions – Tell us about your real or imaginary trip.<br/>
            <br />
            🤖 Let the AI Work Its Magic – Watch your answers become a unique travel log.<br/>
            <br />
            💾 Save & Revisit – Keep your logs, edit them, and relive the journey anytime.
           </span>
            <About />
        </div>
        </>
       
    )

}

export default AboutPage;