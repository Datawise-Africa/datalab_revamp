import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import Section from "../HomePage/Section";
import { socials } from "../../constants";

const socialIcons = {
    LinkedIn: faLinkedin,
    Github: faGithub
}

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-[#757185] lg:block text-sm md:pl-30">Datawise Africa &copy; {new Date().getFullYear()}. All rights reserved.</p>

        <ul className="flex gap-5 flex-wrap">
            {socials.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-[#15131D] rounded-full transition-colors hover:bg-[#252134] cursor-pointer">
                    <FontAwesomeIcon icon={socialIcons[item.name]} className="text-xl"/>
                </a>
            ))}
        </ul>
      </div>
    </Section>
  )
}

export default Footer