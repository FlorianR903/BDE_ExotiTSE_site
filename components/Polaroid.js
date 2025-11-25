function Polaroid({ src, className }) {
    return (
        <div className={`relative md:w-40 md:h-48 ${className}`}>
            {/* Photo */}
            <Image
                src={src}
                alt="Photo"
                fill
                className="object-cover rounded-lg"
            />

            {/* Cadre Polaroid */}
            <Image
                src="/images/cadre_polaroid_empty.png"
                alt="Cadre polaroid"
                fill
                className="object-contain pointer-events-none"
            />
        </div>
    );
}