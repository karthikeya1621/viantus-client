import React, { cloneElement } from "react"

const Link = (props: any) => {
    const cloned: any = cloneElement(props.children, {href: props.to});
    return <>{cloned.type == 'a' ? cloned : <a href={props.to}>{cloned}</a>}</>;
}

export default Link;