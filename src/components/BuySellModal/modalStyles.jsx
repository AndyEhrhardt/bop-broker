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
        p: 4,
        height: 290,
        borderRadius: 5
    },
    paperWrap:{
        minWidth: 500,
        maxWidth: 400,
        backgroundColor: '#fbf9f3'
    },
    addPadd:{
        padding: 10,
        height: 280
    }
}));





export default useStyles;