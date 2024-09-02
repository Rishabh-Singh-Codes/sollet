const PayButton = ({value}: {value?: number}) => {
    return (
        <div className="w-full rounded-2xl py-1 px-4 bg-[#1d9bf0] text-center">{value} SOL</div>
    )
}

export default PayButton;