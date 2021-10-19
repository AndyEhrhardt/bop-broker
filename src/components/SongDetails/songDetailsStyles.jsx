import { makeStyles } from '@material-ui/core/styles';


const songStyles = makeStyles(() => ({
    title : {
        fontFamily: 'roboto',
        fontSize: 50
    },
    innerModalWrap:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        backgroundColor: 'white',
        p: 4,
        height: '60%',
        borderRadius: 5
    },
    paperWrap:{
        minWidth: 500,
        maxWidth: 400,
        backgroundColor: 'white'
    },
    addPadd:{
        padding: 10,
        height: 280
    },
    mainDetailsWrapper:{
        padding: 10,
        maxWidth: 290
    }
}));





export default songStyles;