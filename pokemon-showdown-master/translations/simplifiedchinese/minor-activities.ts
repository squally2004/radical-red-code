import type {Translations} from "../../server/chat";

export const translations: Translations = {
	strings: {
		"The announcement has ended.": "广播已结束",
		"Battles do not support announcements.": "对战里不支持广播",
		"You are not allowed to use filtered words in announcements.": "广播里不能使用被禁的词语",
		"There is already a poll or announcement in progress in this room.": "本房已有投票或广播",
		"An announcement was started by ${user.name}.": "${user.name}开了一个广播",
		"There is no announcement running in this room.": "本房没有广播",
		"There is no timer to clear.": "无定时器可以删除",
		"The announcement timer was turned off.": "广播定时器已被关闭",
		"Invalid time given.": "所定的时间无效",
		"The announcement timer is off.": "广播定时器已关闭",
		"The announcement was ended by ${user.name}.": "广播已被${user.name}终结",
		"Accepts the following commands:": "只接受下列的指令",

		"That option is not selected.": "没有选择",
		"You have already voted for this poll.": "你有已经投票了",
		"No options selected.": "无选择",
		"you will not be able to vote after viewing results": "点开结果后就不能再投票",
		"View results": "看结果",
		"You can't vote after viewing results": "你已看了结果，无法投票",
		"The poll has ended &ndash; scroll down to see the results": "投票结束&ndash;结论在此",
		"Vote for ${num}": "投给${num}",
		"Submit your vote": "提交选择",
		"Quiz": "测验",
		"Poll": "投票",
		"Submit": "提交",
		"ended": "终结了",
		"votes": "票数",
		"delete": "删除",
		"Poll too long.": "投票太长",
		"Battles do not support polls.": "对战里不支持投票",
		"You are not allowed to use filtered words in polls.": "投票里不能使用被禁的词语",
		"Not enough arguments for /poll new.": "投票参数不够使用/poll new",
		"Too many options for poll (maximum is 8).": "投票选项不能超越8个",
		"There are duplicate options in the poll.": "投票选项里有重复",
		"${user.name} queued a poll.": "${user.name}安插了下一个投票",
		"A poll was started by ${user.name}.": "${user.name}开了一个投票",
		"The queue is already empty.": "队列已是空的",
		"Cleared poll queue.": "投票队列被清空",
		"Room \"${roomid}\" not found.": "找不到\"${roomid}\"房",
		"Can't delete poll at slot ${slotString} - \"${slotString}\" is not a number.": "${slotString} - \"${slotString}\"位置不是数字，无法从投票里删除",
		"There is no poll in queue at slot ${slot}.": "这个位置没有投票队列",
		"(${user.name} deleted the queued poll in slot ${slot}.)": "(${user.name}在${slot}位置删除了队列里的投票",
		"There is no poll running in this room.": "队列的这个位置没有投票",
		"To vote, specify the number of the option.": "请指明选项",
		"Option not in poll.": "投票里没有这个选项",
		"The poll timer was turned off.": "投票定时器已被关闭",
		"The queued poll was started.": "下一个投票开始了",
		"The poll timer was turned on: the poll will end in ${timeout} minute(s).": "投票将在${timeout}分钟后终结",
		"The poll timer was set to ${timeout} minute(s) by ${user.name}.": "${user.name}.设定了${timeout}分钟的投票定时器",
		"The poll timer is on and will end in ${poll.timeoutMins} minute(s).": "投票将在${poll.timeoutMins}分钟后终结",
		"The poll timer is off.": "投票定时器已关闭",
		"The poll was ended by ${user.name}.": "投票已被${user.name}终结",
		"Queued polls:": "投票队列",
		"Refresh": "刷新",
		"No polls queued.": "队列里无投票",
		"#${number} in queue": "队列里第${number}个",

		"- We log PMs so you can report them - staff can't look at them without permission unless there's a law enforcement reason.": "",
		"- We log IPs to enforce bans and mutes.": "",
		"- We use cookies to save your login info and teams, and for Google Analytics and AdSense.": "",
		'- For more information, you can read our <a href="https://${Config.routes.root}/privacy">full privacy policy.</a>': '',
	},
};
