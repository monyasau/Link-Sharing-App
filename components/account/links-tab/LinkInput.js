import {useState, useRef, useEffect, useContext} from 'react';
import {Context} from '../../../pages/_app';
import useMediaQuery from '../../../hooks/useMediaQuery';
import styles from '../../../styles/account/links-tab/LinkInput.module.css'

const LinkInput = ({initialState, linkId}) => {
    const {dispatch} = useContext(Context)
    const [url, setUrl] = useState(initialState);
    const inputRef = useRef();
    const emptyMessageRef = useRef();
    const invalidUrlMessageRef = useRef();
    const mobile = useMediaQuery('(max-width: 700px)');

    const isValidUrl = (url) => {
        try{
            new URL(url);
            return true;
        }
        catch(error){
            return false
        }
    }

    const handleChange = (e) => {
        e.target.setCustomValidity('');
        setUrl(e.target.value);
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const isValidLink = isValidUrl(url);
        
        if(isEmpty) {
            emptyMessageRef.current.style.display = 'flex';
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.color = '#FF3939'
        }
        else if(!isValidLink) {
            e.target.setCustomValidity(' ');
            invalidUrlMessageRef.current.style.display = 'flex';
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.color = '#FF3939';
        }
        dispatch({type: 'update link', linkId, link: url})
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty){
            emptyMessageRef.current.style.display = 'flex';
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.color = '#FF3939' ;      
        }
    }

    useEffect(() => {
        emptyMessageRef.current.style.display = '';
        inputRef.current.style.border = '';
        inputRef.current.style.color = '';
        invalidUrlMessageRef.current.style.display = '';
    }, [url])

    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Link
            </label>
            <div className={styles.input_container}>
                <img src={'/icons/icon-link.svg'} className={styles.link_icon}/>
                <input type='url' 
                    className={styles.input}
                    name={'url'}
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    placeholder='e.g. https://www.github.com/johnappleseed'
                    pattern="https://.*"
                    ref={inputRef}
                    required/>
                <p className={styles.errorMessage} ref={emptyMessageRef}>
                    Can't be empty
                </p>    
                <p className={styles.errorMessage} ref={invalidUrlMessageRef}>
                    Please check the URL
                </p>
            </div>
        </fieldset>
    )
}

export default LinkInput;