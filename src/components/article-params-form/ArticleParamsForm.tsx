import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import { ReactEventHandler, useState } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsForm = {
	submitClick: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [formState, setFormState] = useState(defaultArticleState);

	const handleOpen = (): void => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const onSubmit = (e: React.SyntheticEvent<EventTarget>): void => {
		e.preventDefault();
	};

	const setPageState = (): void => {
		props.submitClick(formState);
	};

	const setDefaultState = (): void => {
		setFormState(defaultArticleState);
		props.submitClick(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} setIsOpen={handleOpen} />
			{/* <aside className={isOpen ? clsx(styles.container, styles.container_open) : clsx(styles.container)}></aside> */}
			<aside
				className={
					isOpen
						? clsx(styles.container, styles.container_open)
						: clsx(styles.container)
				}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text as='p' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'шрифт'}
						onChange={(option) => {
							setFormState({
								...formState,
								fontFamilyOption: option,
							});
						}}
					/>

					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title={'размер шрифта'}
						name={'размер шрифта'}
						onChange={(option) => {
							setFormState({
								...formState,
								fontSizeOption: option,
							});
						}}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						title={'цвет шрифта'}
						onChange={(option) => {
							setFormState({
								...formState,
								fontColor: option,
							});
						}}
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title={'цвет фона'}
						onChange={(option) => {
							setFormState({
								...formState,
								backgroundColor: option,
							});
						}}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title={'ширина контента'}
						onChange={(option) => {
							setFormState({
								...formState,
								contentWidth: option,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={setDefaultState} />
						<Button title='Применить' type='submit' onClick={setPageState} />
					</div>
				</form>
			</aside>
		</>
	);
};
