import { CSSProperties, useState } from 'react';

import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);

	const handlePageState = (state: ArticleStateType) => {
		setPageState(state);
		console.log(pageState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				openStatus={isOpenSidebar}
				setOpenStatus={setIsOpenSidebar}
				submitClick={handlePageState}
			/>
			<Article />
		</main>
	);
};
