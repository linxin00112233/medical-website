
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/LanguageContext';
import { FileText, Info } from 'lucide-react';

const AppointmentPage: React.FC = () => {
    const { language } = useLanguage();
    const MotionDiv = motion.div as any;

    // 动画配置
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 顶部标题区 */}
            <div className="bg-cuhk-primary text-white pt-32 pb-16 px-4 relative overflow-hidden">
                <div className="container mx-auto px-4 lg:px-24 relative z-10">
                    <MotionDiv
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-serif font-bold">
                            {language === 'zh' ? '患者预约挂号指南' : 'Patient Appointment Guide'}
                        </h1>
                        <div className="w-16 h-1 bg-cuhk-secondary mt-4 rounded-full" />
                    </MotionDiv>
                </div>
            </div>

            {/* 主体内容区 */}
            <div className="container mx-auto px-4 lg:px-24 py-12 flex-1">
                <MotionDiv
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white p-8 md:p-16 shadow-xl rounded-sm border-t-4 border-cuhk-secondary"
                >
                    {/* 预约方式部分 */}
                    <section className="mb-16">
                        <MotionDiv variants={itemVariants} className="flex items-center mb-8">
                            <FileText className="text-cuhk-primary mr-3" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800">
                                {language === 'zh' ? '预约挂号方式：' : 'Booking Methods:'}
                            </h2>
                        </MotionDiv>

                        <div className="space-y-8 pl-4 md:pl-8">
                            <MotionDiv variants={itemVariants} className="group">
                                <h3 className="text-lg font-bold text-cuhk-primary mb-2">
                                    1. {language === 'zh' ? '线上微信预约' : 'WeChat Booking'}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {language === 'zh'
                                        ? '搜索并关注“香港中文大学深圳医院”微信公众号，点击下方菜单栏【智慧医疗】-【预约挂号】即可根据科室或医生实时排班进行选号。'
                                        : 'Search and follow the "CUHK-Shenzhen Med Hospital" WeChat account. Go to [Smart Medical] - [Appointment] to book based on real-time schedules.'}
                                </p>
                            </MotionDiv>

                            <div className="h-px bg-gray-100" />

                            <MotionDiv variants={itemVariants} className="group">
                                <h3 className="text-lg font-bold text-cuhk-primary mb-2">
                                    2. {language === 'zh' ? '现场自助终端预约' : 'On-site Terminal'}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {language === 'zh'
                                        ? '本院门诊一至四楼均设有银医通自助服务机。患者可凭二代身份证、社会保障卡或本院就诊卡，在自助机端进行当日及未来七天内的预约。'
                                        : 'Self-service kiosks are available on floors 1-4. Use your ID card or SS card to book for the current day or the next seven days.'}
                                </p>
                            </MotionDiv>

                            <div className="h-px bg-gray-100" />

                            <MotionDiv variants={itemVariants} className="group">
                                <h3 className="text-lg font-bold text-cuhk-primary mb-2">
                                    3. {language === 'zh' ? '电话热线预约' : 'Hotline Booking'}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {language === 'zh'
                                        ? '请于工作日（8:00-17:30）拨打 0755-8427 3000。由客服中心专人协助您确认科室信息及医生出诊详情。'
                                        : 'Call 0755-8427 3000 during workdays (8:00-17:30). Our staff will assist with department and doctor availability.'}
                                </p>
                            </MotionDiv>

                            <div className="h-px bg-gray-100" />

                            <MotionDiv variants={itemVariants} className="group">
                                <h3 className="text-lg font-bold text-cuhk-primary mb-2">
                                    4. {language === 'zh' ? '医生诊间预约' : 'Doctor Workstation'}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {language === 'zh'
                                        ? '针对需要定期复诊的慢性病或术后患者，可在当次就诊结束前，由主治医生在医生工作站直接预约下一次的复诊时间。'
                                        : 'For follow-up patients, doctors can schedule the next appointment directly from their workstation at the end of the current visit.'}
                                </p>
                            </MotionDiv>
                        </div>
                    </section>

                    {/* 预约须知部分 */}
                    <section className="bg-gray-50/50 p-8 rounded border border-gray-100">
                        <MotionDiv variants={itemVariants} className="flex items-center mb-6">
                            <Info className="text-cuhk-secondary mr-3" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">
                                {language === 'zh' ? '预约挂号须知：' : 'Important Notice:'}
                            </h2>
                        </MotionDiv>

                        <div className="space-y-6">
                            <MotionDiv variants={itemVariants} className="flex items-start">
                                <span className="w-6 h-6 rounded-full bg-cuhk-secondary/20 text-cuhk-secondary text-xs flex items-center justify-center font-bold mr-3 mt-1 shrink-0">1</span>
                                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                    {language === 'zh'
                                        ? '所有预约挂号均采用实名制，请预约时如实填写个人真实姓名、证件号码（身份证、护照或通行证）以及有效的手机联系方式。'
                                        : 'Registration is under a real-name system. Please provide your real name, ID/Passport number, and a valid mobile number during booking.'}
                                </p>
                            </MotionDiv>

                            <MotionDiv variants={itemVariants} className="flex items-start">
                                <span className="w-6 h-6 rounded-full bg-cuhk-secondary/20 text-cuhk-secondary text-xs flex items-center justify-center font-bold mr-3 mt-1 shrink-0">2</span>
                                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                    {language === 'zh'
                                        ? '如无法按时就诊，请务必提前24小时取消预约。未按规定取消且未准时到诊者计为“爽约”，半年内累计爽约3次，系统将自动限制其在线预约权限。'
                                        : 'If unable to visit, cancel 24 hours in advance. Failure to do so counts as a "no-show". Three no-shows in six months will restrict booking privileges.'}
                                </p>
                            </MotionDiv>
                        </div>
                    </section>
                </MotionDiv>

                {/* 底部咨询提示 */}
                <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-400 text-sm italic">
                        {language === 'zh' ? '如有疑问，请咨询医务室或拨打导医台电话。' : 'For inquiries, please contact the clinic or nursing station.'}
                    </p>
                </MotionDiv>
            </div>
        </div>
    );
};

export default AppointmentPage;
