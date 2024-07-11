import React from 'react'
import { Loader } from './index.js'

function Container({
    children,
    LoadingConditions = [],
    RenderingConditions = [],
    backupElem = null,
    className = '' }) {

    const canRender = !RenderingConditions?.includes(false)
    const canShowLoading = LoadingConditions?.includes(true)

    return (
        canShowLoading ?
            <Loader /> :
            (canRender ? <div className={className}>
                {children}
            </div> : backupElem)
    )
}

export default Container