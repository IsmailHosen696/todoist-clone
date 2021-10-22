import { NavLink } from "react-router-dom";

interface propType {
    name: string,
    icon: JSX.Element,
    count: number,
    path: string
}
export default function NavLinkSidevar(props: propType) {
    return (
        <NavLink
            className='flex py-2 px-2 text-sm dark:hover:bg-selectDark dark:focus:bg-blue-400 hover:bg-selectWhite rounded justify-between w-44 items-center focus:bg-blue-400 focus:text-white'
            activeClassName="activeSidebarLink"
            exact to={props.path}>
            <span
                className="items-center flex">
                {props.icon}
                <span className="px-1 dark:text-gray-300">
                    {props.name}
                </span>
            </span>
            <span className="dark:text-gray-300">
                {props.count}
            </span>
        </NavLink>
    )
}