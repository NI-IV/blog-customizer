import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import { ReactEventHandler, useRef, useState } from 'react';
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
import { useClose } from 'src/hooks/useClose';

type TArticleParamsForm = {
	openStatus: boolean;
	setOpenStatus: Function;
	submitClick: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = [props.openStatus, props.setOpenStatus];

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLFormElement>(null);

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	const handleOpenSidebar = (): void => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const onSubmit = (e: React.SyntheticEvent<EventTarget>): void => {
		e.preventDefault();
		props.submitClick(formState);
	};

	const onReset = (): void => {
		setFormState(defaultArticleState);
		props.submitClick(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} setIsOpen={handleOpenSidebar} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={onSubmit}
					onReset={onReset}
					ref={formRef}>
					<Text as='p' size={31} weight={800} uppercase dynamic={false}>
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
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
