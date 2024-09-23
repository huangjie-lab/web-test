import { $t } from "../../i18n/config/i18n";
function TestI18n() {   
    return (
        <div>
            <h1>{$t('首页')}</h1>
            <h1>{$t('测试')}</h1>
        </div>  
    )
}
export default TestI18n;