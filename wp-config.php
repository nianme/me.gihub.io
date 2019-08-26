<?php
/**
 * WordPress基础配置文件。
 *
 * 这个文件被安装程序用于自动生成wp-config.php配置文件，
 * 您可以不使用网站，您需要手动复制这个文件，
 * 并重命名为“wp-config.php”，然后填入相关信息。
 *
 * 本文件包含以下配置选项：
 *
 * * MySQL设置
 * * 密钥
 * * 数据库表名前缀
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/zh-cn:%E7%BC%96%E8%BE%91_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress数据库的名称 */
define( 'DB_NAME', 'meai' );

/** MySQL数据库用户名 */
define( 'DB_USER', 'meai' );

/** MySQL数据库密码 */
define( 'DB_PASSWORD', 'meai@' );

/** MySQL主机 */
define( 'DB_HOST', 'localhost' );

/** 创建数据表时默认的文字编码 */
define( 'DB_CHARSET', 'utf8mb4' );

/** 数据库整理类型。如不确定请勿更改 */
define( 'DB_COLLATE', '' );

/**#@+
 * 身份认证密钥与盐。
 *
 * 修改为任意独一无二的字串！
 * 或者直接访问{@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org密钥生成服务}
 * 任何修改都会导致所有cookies失效，所有用户将必须重新登录。
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ':$vM7K8m2w7_.H?h${fPfL/_t#rYK0!=vl!/e9`3rQ?X{)`xVb/Rkk2(3EQ!XNo~' );
define( 'SECURE_AUTH_KEY',  'v&ylctyy_#~/K49H RmG6c=W{CqqqiymN<Wx@Pg7}OL-L5QD|pSGk@`p3.YnCKKv' );
define( 'LOGGED_IN_KEY',    '?d5/sVp!c,y*j0n:9.cVU@r#lk)hdU&(A(yuJ3ru3kzx-cyKF@KlSQb1hQr;qu#5' );
define( 'NONCE_KEY',        'X|Gnt?~Wt)hOuc| :vSBdDv.um(HuV2p$uV:rMc8+ 3-)=3iuI6#D[P>`1P217MT' );
define( 'AUTH_SALT',        'D9Jl(#^q8U]hW=h8k.`4tN,HVJrxE=p}Zk|x&9F;u!C5Ph QdN6I=c}&Guk?-5#V' );
define( 'SECURE_AUTH_SALT', '~.c_QxPCf%8A cdcZ!VoS,[E}JU_*^n7r#_vPT.L!nsjdHdZShKGV_<!MdMjNp7O' );
define( 'LOGGED_IN_SALT',   'RD:1jzr!bpZx}0fDMyq(C=woPH--q+DNB8QMXG77+ih{<nWCH^qRL#OzwgS?R5p4' );
define( 'NONCE_SALT',       'p,8Bw~t3{Nw6Qk%Q5.m2:nE)QSyux +j33x=El.0_uh_&vL,^ `B}9a%I3/d}x-$' );

/**#@-*/

/**
 * WordPress数据表前缀。
 *
 * 如果您有在同一数据库内安装多个WordPress的需求，请为每个WordPress设置
 * 不同的数据表前缀。前缀名只能为数字、字母加下划线。
 */
$table_prefix = 'wp_';

/**
 * 开发者专用：WordPress调试模式。
 *
 * 将这个值改为true，WordPress将显示所有用于开发的提示。
 * 强烈建议插件开发者在开发环境中启用WP_DEBUG。
 *
 * 要获取其他能用于调试的信息，请访问Codex。
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */

/** WordPress目录的绝对路径。 */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** 设置WordPress变量和包含文件。 */
require_once( ABSPATH . 'wp-settings.php' );
