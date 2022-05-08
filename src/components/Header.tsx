interface Props {
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ handleToggleFormClick }: Props) => {
    return (
        <header>
            <h1>Kasvuu</h1>
            <button
                type="button"
                id="show-add-plant-form"
                onClick={handleToggleFormClick}
            >
                Add plant
            </button>
        </header>
    );
};

export default Header;
