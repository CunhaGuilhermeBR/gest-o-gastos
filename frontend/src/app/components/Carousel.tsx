import { useState } from 'react';

interface CarouselProps {
    data: AggregateExpenses[]
}

interface AggregateExpenses {
    year: string;
    total: number;
    month: string;
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === data.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="col-span-2 relative w-full max-w-lg mx-auto mt-10 rounded-full text-deep-yellow-persona bg-black-persona">
            <div className="overflow-hidden relative h-40 rounded-full shadow-lg ">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`font-mono absolute inset-0 flex flex-col items-center justify-center transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'}`}
                        style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                    >
                        <h2 className="text-xl"><b>{item.month} {item.year}</b></h2>
                        <p className="text-lg"><b>Total:</b> {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
                <button onClick={prevSlide} className="p-2 rounded-full">
                    &lt;
                </button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
                <button onClick={nextSlide} className="p-2 rounded-full">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
