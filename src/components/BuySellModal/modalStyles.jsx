import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    title : {
        fontFamily: 'roboto',
        fontSize: 50
    },
    innerModalWrap:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#fbf9f3',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: 300,
    },
    inputWrapper:{
        
    }
}));





export default useStyles;