export const CONFIG = 
{
    // 当前最大请求数
    QUERY_PAGE_NUM: 20,
    // 延迟刷新1.5秒
    REFRESH_DELAY: 1500,
    BUTTON_STYLES: {
        position: 'fixed',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        zIndex: '9999',
        padding: '20px'
    },
    //
    BUTTON_CONTAINER_STYLES: {
        position: 'fixed',
        top: '200px',
        right: '20px',
        zIndex: '9999',
        padding: '10px',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    INPUT_STYLES: {
        width: '60px',
        padding: '5px',
        marginLeft: '10px'
    }
};