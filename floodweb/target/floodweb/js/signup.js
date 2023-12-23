$(document).ready(function () {
	// 填充地区选项
	$.get("region/fetchall", function(data) {
		$.each(data, function(index, value, array) {
			$('#region').append("<option value='" + value.regionID + "'>" + value.regionName + "</option>");
		});
	});
	
	$('#btn_signup').click(function() {
		if (validateAll()) {
			$.ajax({
	            url :  "user/add",
	            type: "POST",
	            data: { 
	            		username: $('#username').val(), 
	            		password: $('#password').val(),
	            		phone: $('#phone').val(),
	            		organization: $('#organization').val(),
	            		region: $('#region').val()
	            	},
	            error: function(request) {
	                alert("Connection error");
	            },
	            success: function(data) {
	                if (data.ok == true) {
		                	$('#myModal').modal('show');
		            		var time = 5;
		            		setInterval(function() {
		            			if (time == 0) {
		            				window.location.href = 'signin.html';
		            				return;
		            			} else {
		            				$('#modal_content').text(time + "秒");
		            				time--;
		            			}
		            		}, 1000);
	                } else {
	                    alert("注册失败,请检查输入信息")
	                }
	            }
	        });
		}
		
		return false;
	});

	
	$('#username').blur( function() {
		checkUsername();
		$(this).parent().parent().addClass('has-success').addClass('has-feedback');
		$(this).next('span').removeClass('hidden').addClass('glyphicon-ok');
	});
	$('#password').blur(function() {
		checkPassword();
	});
	$('#repassword').blur(function() {
		checkRepassword();
	});
	$('#phone').blur(function() {
		checkPhone();
	});
	$('#organization').blur(function() {
		checkOrganization();
	});
});

function validateAll() {
	if (checkUsername() && checkPassword() && checkRepassword()
			&& checkPhone() && checkOrganization()) {
		return true;
	} else {
		return false;
	}
}

/**
 * 检查用户名输入
 * @returns
 */
function checkUsername() {
	var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
	if (!uPattern.test($('#username').val())) {
		$('#usernameHelpBlock').removeClass('hidden').text('用户名要求4-16个字符，仅包含字母、数字、下划线、横线');
		$('#username').parent().parent().removeClass('has-success').addClass('has-error').addClass('has-feedback');
		$('#username').next('span').removeClass('hidden').removeClass('glyphicon-ok').addClass('glyphicon-remove');
		return false;
	} 
	$.get('user/checkname', {username: trim($('#username').val())}, function(data) {
		// data为true表示已存在该用户名
		if (data) {
			$('#usernameHelpBlock').removeClass('hidden').text("已存在该用户名");
			$('#username').parent().parent().removeClass('has-success').addClass('has-error').addClass('has-feedback');
			$('#username').next('span').removeClass('hidden').removeClass('glyphicon-ok').addClass('glyphicon-remove');
		} else {
			$('#username').parent().parent().removeClass('has-error').addClass('has-success').addClass('has-feedback');
			$('#username').next('span').removeClass('hidden').removeClass('glyphicon-remove').addClass('glyphicon-ok');
			$('#usernameHelpBlock').addClass('hidden');
		}
	});
	return true;
}

/**
 * 检查密码输入
 * @returns
 */
function checkPassword() {
	var pPattern = /^[a-zA-Z0-9_]{6,}$/;
	if (!pPattern.test($('#password').val())) {
		$('#passwordHelpBlock').removeClass('hidden').text('密码仅包含字母、数字、下划线，不少于6个字符');
		$('#password').parent().parent().removeClass('has-success').addClass('has-error').addClass('has-feedback');
		$('#password').next('span').removeClass('hidden').removeClass('glyphicon-ok').addClass('glyphicon-remove');
		return false;
	} else {
		$('#password').parent().parent().removeClass('has-error').addClass('has-success').addClass('has-feedback');
		$('#password').next('span').removeClass('hidden').removeClass('glyphicon-remove').addClass('glyphicon-ok');
		$('#passwordHelpBlock').addClass('hidden');
		return true;
	}
}

/**
 * 检查再次密码输入
 * @returns
 */
function checkRepassword() {
	if ($('#repassword').val() != $('#password').val()) {
		$('#repasswordHelpBlock').removeClass('hidden').text('密码输入不一致');
		$('#repassword').parent().parent().removeClass('has-success').addClass('has-error').addClass('has-feedback');
		$('#repassword').next('span').removeClass('hidden').removeClass('glyphicon-ok').addClass('glyphicon-remove');
		return false;
	} else {
		if ($('#repassword').val() == "" || $('#repassword').val() == null) {
			return false;
		} else {
			$('#repassword').parent().parent().removeClass('has-error').addClass('has-success').addClass('has-feedback');
			$('#repassword').next('span').removeClass('hidden').removeClass('glyphicon-remove').addClass('glyphicon-ok');
			$('#repasswordHelpBlock').addClass('hidden');
			return true;
		}
	}
}

/**
 * 检查手机号
 * @returns
 */
function checkPhone() {
	var phPattern = /^1\d{10}$/;
	if (!phPattern.test($('#phone').val())) {
		$('#phoneHelpBlock').removeClass('hidden').text('手机号码填写不符合要求，请填写11位数字号码');
		$('#phone').parent().parent().removeClass('has-success').addClass('has-error').addClass('has-feedback');
		$('#phone').next('span').removeClass('hidden').removeClass('glyphicon-ok').addClass('glyphicon-remove');
		return false;
	} else {
		$('#phone').parent().parent().removeClass('has-error').addClass('has-success').addClass('has-feedback');
		$('#phone').next('span').removeClass('hidden').removeClass('glyphicon-remove').addClass('glyphicon-ok');
		$('#phoneHelpBlock').addClass('hidden');
		return true;
	}
}

function checkOrganization() {
	if ($('#organization').val() == "") {
		$('#organizationHelpBlock').removeClass('hidden').text('单位不能为空');
		$('#organization').parent().parent().removeClass('has-success').addClass('has-error').addClass('has-feedback');
		$('#organization').next('span').removeClass('hidden').removeClass('glyphicon-ok').addClass('glyphicon-remove');
		return false;
	} else {
		$('#organization').parent().parent().removeClass('has-error').addClass('has-success').addClass('has-feedback');
		$('#organization').next('span').removeClass('hidden').removeClass('glyphicon-remove').addClass('glyphicon-ok');
		$('#organizationHelpBlock').addClass('hidden');
		return true;
	}
}


/**
 * Trim
 * @param str
 * @returns
 */
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}