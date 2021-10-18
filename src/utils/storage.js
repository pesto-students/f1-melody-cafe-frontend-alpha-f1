const storage = window.localStorage;

export const getStreamQuality = () => {
    const quality = storage.getItem("streamQuality");
    return quality === null || quality === undefined ? "high" : quality
}

export const setStreamQuality =(quality) => {
    storage.setItem("streamQuality", quality)
} 