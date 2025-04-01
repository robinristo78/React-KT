const Button = (props) => {
    const classes = props.textOnly ? 'text-button' : 'button';

    return (
        <button className={classes} type={props.type || 'button'} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;