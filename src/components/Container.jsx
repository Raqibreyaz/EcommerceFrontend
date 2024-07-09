import React from 'react'
import { Loader } from './index.js'

function Container({
    children,
    LoadingConditions = [],
    RenderingConditions = [],
    backupElem = null,
    className = '' }) {
    return (
        LoadingConditions.includes(true) ?
            <Loader />
            : (!RenderingConditions.includes(false) ? < div className={className}>
                {children}
            </div > : backupElem)
    )
}

export default Container