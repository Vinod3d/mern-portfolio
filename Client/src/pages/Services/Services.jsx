import './Services.css'
import theme_pattern from "../../assets/theme_pattern.svg";
import Services_Data from '../../assets/services_data'
import arrow_icon from '../../assets/arrow_icon.svg'

const Services = () => {
  return (
    <div className="services" id="services">
        <div className="title-box">
            <h1>My Services</h1>
            <img src={theme_pattern} alt="" />
        </div>
        <div className="services-container max-sm:grid-cols-1 max-sm:w-[80vw]">
            {Services_Data.map((service, index)=>{
                return (
                    <div key={index} className="services-format">
                        <h2>{service.s_no}</h2>
                        <h3>{service.s_name}</h3>
                        <p>{service.s_desc}</p>
                        <div className="services-readmore">
                            <p>Read More</p>
                            <img src={arrow_icon} alt="" width="20px" height="15px" />
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Services