const TimeAndLocation = ({ weather: { formattedLocalTime, name, country } }) => {
    return (
        <div>
            <div className="flex items-center justify-center my-6 text-center">
                <p className="text-xl font-extralight text-white/70">
                    {/* Tuesday, 14 May 2024 | Local time: 07:21 AM */}
                    {formattedLocalTime}
                </p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-3xl font-medium">{name}, {country}</p>
            </div>
        </div>
    )
}

export default TimeAndLocation